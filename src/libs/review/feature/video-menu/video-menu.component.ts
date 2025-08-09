import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  Subject,
  debounceTime,
  fromEvent,
  takeUntil
} from "rxjs";
import { AssetVersion } from "@review/util/models/asset-version";
import { ASSET_VERSION_TYPE } from "@review/util/models/asset-version-type";
import { MESSAGE_BUS_TOKEN } from "@shared/tokens";
import { UniqueId } from "@shared/util/models/unique-id";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@shared/util/interfaces/message-bus.interface";
import { ChangeActiveVideoUseCase } from "@review/data-access/usecases/change-active-video";
import { ASSET_STATE } from "@review/feature/workspace/services/media-assets.service";

const LOADING_CLASS = "loading";
const VIDEO_DIGITS_ROUND = 5;

const INITIAL_RAF_TIMER = -Infinity;
@Component({
  selector: "video-menu",
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VideoMenuComponent implements OnInit, OnDestroy {
  private changeActiveVersionUseCase = inject(ChangeActiveVideoUseCase);
  private messageBus = inject<MessageBus>(MESSAGE_BUS_TOKEN);

  private _currentVersionId: number | null = null;
  public get currentVersionId(): number | null {
    return this._currentVersionId;
  }
  @Input()
  public set currentVersionId(value: number | null) {
    this._currentVersionId = value;
    this.lastRafTime = INITIAL_RAF_TIMER;
  }

  private destroyed$ = new Subject<void>();
  private pointerState: "INITIAL" | "POINTER_DOWN" = "INITIAL";
  private lastRafTime = INITIAL_RAF_TIMER;
  private rafTimerNumber = 0;
  private assetsMap = new Map<UniqueId, HTMLImageElement | HTMLVideoElement>();

  readonly playlist = input.required<AssetVersion[]>();

  public videoPlaylist = computed(() => {
    return this.playlist().filter(
      (item) => item.type === ASSET_VERSION_TYPE.VIDEO
    );
  });

  public isPlaying = signal(false);

  ngOnInit(): void {
    this.setRaf();
    this.listenToAssetStateChange();
    this.listenToAssetInit();
    this.listenToAssetDestroyed();

    fromEvent(window, "resize")
      .pipe(debounceTime(100), takeUntil(this.destroyed$))
      .subscribe(() => this.onResize());
  }

  public trackByFunc(_: number, item: AssetVersion) {
    return item.id;
  }

  public changeVideo(versionId: number) {
    this.changeActiveVersionUseCase.execute(versionId);
  }

  public onPointerMove(event: PointerEvent): void {
    if (isOnSlider(event) && this.pointerState === "POINTER_DOWN") {
      const { id, clientWidth } = event.target as HTMLDivElement;

      if (this.currentVersionId !== +id) {
        this.changeActiveVersionUseCase.execute(+id);
      }

      const cursor = getCursor(id);
      const pos = Math.min(event.offsetX, clientWidth);
      if (cursor) {
        setCursorPositionStyle(cursor, pos);
      }
      this.updateVideoTime(pos, clientWidth, id);
    }
  }

  public onPointerDown(event: PointerEvent): void {
    if (isOnSlider(event)) {
      this.pointerState = "POINTER_DOWN";
      const { id, clientWidth } = event.target as HTMLDivElement;
      if (this.currentVersionId !== +id) {
        this.changeActiveVersionUseCase.execute(+id);
      }

      const cursor = getCursor(id);
      const pos = event.offsetX;
      if (cursor) {
        cursor.style.transform = `translateX(${pos}px)`;
      }
      this.updateVideoTime(pos, clientWidth, id);
    }
  }
  @HostListener("document:pointerup", ["$event"])
  public onPointerUp() {
    this.pointerState = "INITIAL";
  }

  public togglePlayingState() {
    if (!this.currentVersionId) {
      return;
    }
    const video = this.getVideo(this.currentVersionId);
    if (!video) {
      return;
    }

    if (this.isPlaying()) {
      //stop playing
      video.pause();
      this.isPlaying.set(false);
    } else {
      video
        .play()
        .then(() => {
          this.isPlaying.set(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  private listenToAssetStateChange() {
    this.messageBus
      .fromAction(MESSAGE_ACTION.ASSET_STATE_CHANGED)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        const { id, state } = message.body;
        if (state === ASSET_STATE.LOADED) {
          const slider = getSlider(id);
          if (slider) {
            slider.classList.remove(LOADING_CLASS);
          }
        }
      });
  }

  private updateVideoTime(pos: number, clientWidth: number, id: string) {
    const timePercentage = getTimePercentageFromPosition(pos, clientWidth);
    const video = this.getVideo(id);
    if (video && video.duration) {
      const newTime = +(timePercentage * video.duration).toFixed(
        VIDEO_DIGITS_ROUND
      );
      video.currentTime = newTime;
    }
  }

  private getVideo(id: string | number): HTMLVideoElement | undefined {
    const videoFromMap = this.assetsMap.get(+id);
    if (videoFromMap && videoFromMap instanceof HTMLVideoElement) {
      return videoFromMap;
    }
    return undefined;
  }

  private setRaf() {
    this.rafTimerNumber = window.requestAnimationFrame(() => {
      //cursor update section
      if (this.currentVersionId && this.pointerState !== "POINTER_DOWN") {
        const currentVideo = this.getVideo(this.currentVersionId);
        if (currentVideo && this.lastRafTime !== currentVideo.currentTime) {
          this.lastRafTime = currentVideo.currentTime;
          this.tryUpdateCursorPosition(currentVideo, this.currentVersionId);
        }
      }
      //on video ended handle
      if (this.currentVersionId) {
        const currentVideo = this.getVideo(this.currentVersionId);
        const closeToEnd =
          currentVideo &&
          currentVideo.duration - currentVideo.currentTime <= 0.01;

        if (closeToEnd) {
          const versions = this.videoPlaylist();
          if (versions.length > 1) {
            this.trySetNextVideo(versions, this.currentVersionId!);
          }
        }
      }
      window.requestAnimationFrame(() => this.setRaf());
    });
  }

  private tryUpdateCursorPosition(
    currentVideo: HTMLVideoElement,
    versionId: number
  ) {
    const cursor = getCursor(versionId);
    const slider = getSlider(versionId);
    if (slider && cursor) {
      const pos = Math.min(
        slider.clientWidth,
        +(currentVideo.currentTime / currentVideo.duration).toFixed(
          VIDEO_DIGITS_ROUND
        ) * slider.clientWidth
      );
      setCursorPositionStyle(cursor, pos);
    }
  }

  private trySetNextVideo(
    versions: AssetVersion[],
    activeVersionId: number
  ): void {
    const currentItemIndex = versions.findIndex(
      (version) => version.id === activeVersionId
    );
    if (currentItemIndex > -1) {
      if (currentItemIndex < versions.length - 1) {
        const nextItemId = versions[currentItemIndex + 1].id;

        const currVideo = this.getVideo(versions[currentItemIndex].id);
        const nextVideo = this.getVideo(nextItemId);

        if (currVideo && nextVideo) {
          currVideo.pause();
          nextVideo.play().then(() => {
            this.changeActiveVersionUseCase.execute(nextItemId);
          });
        }
      }
    }
  }

  private listenToAssetInit(): void {
    this.messageBus
      .fromAction(MESSAGE_ACTION.ASSET_INIT)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        const { id, element } = message.body;
        this.assetsMap.set(id, element);
      });
  }

  private listenToAssetDestroyed(): void {
    this.messageBus
      .fromAction(MESSAGE_ACTION.ASSET_DESTROYED)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        const { id } = message.body;
        this.assetsMap.delete(id);
      });
  }

  private onResize() {
    if (this.isPlaying() || !this.currentVersionId) {
      return;
    }

    const currentVideo = this.getVideo(this.currentVersionId);
    if (currentVideo) {
      this.tryUpdateCursorPosition(currentVideo, this.currentVersionId);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    window.cancelAnimationFrame(this.rafTimerNumber);
  }
}

function getSlider(id: string | number) {
  return document.getElementById(id.toString());
}

function setCursorPositionStyle(cursor: HTMLElement, pos: number) {
  cursor.style.transform = `translateX(${pos}px)`;
}

function getCursor(id: string | number) {
  return document.getElementById(`cursor_${id}`);
}

function getTimePercentageFromPosition(
  pos: number,
  clientWidth: number
): number {
  return +(pos / clientWidth).toFixed(VIDEO_DIGITS_ROUND);
}

function isOnSlider(event: PointerEvent): boolean {
  const divTarget = event.target as HTMLDivElement;
  return divTarget && !!divTarget.id && divTarget.classList.contains("slider");
}
