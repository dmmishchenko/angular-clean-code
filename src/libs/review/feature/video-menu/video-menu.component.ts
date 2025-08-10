import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from "@angular/core";
import { ChangeActiveVideoUseCase } from "@review/data-access/usecases/change-active-video";
import { ASSET_STATE } from "@review/feature/workspace/services/media-assets.service";
import { AssetVersion } from "@review/util/models/asset-version";
import { ASSET_VERSION_TYPE } from "@review/util/models/asset-version-type";
import { MESSAGE_BUS_TOKEN } from "@shared/tokens";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@shared/util/interfaces/message-bus.interface";
import { UniqueId } from "@shared/util/models/unique-id";
import { ReplaySubject, debounceTime, fromEvent, takeUntil } from "rxjs";

const LOADING_CLASS = "loading";
const VIDEO_DIGITS_ROUND = 5;

const INITIAL_RAF_TIMER = -Infinity;

type PointerState = "INITIAL" | "POINTER_DOWN";
@Component({
  selector: "video-menu",
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VideoMenuComponent implements OnInit, OnDestroy {
  readonly currentVersionId = input.required<UniqueId | null>();
  readonly playlist = input.required<AssetVersion[]>();

  protected readonly videoPlaylist = computed(() => {
    return this.playlist().filter(
      (item) => item.type === ASSET_VERSION_TYPE.VIDEO
    );
  });
  private readonly cursorPosition = signal<number>(0);

  protected readonly isPlaying = signal(false);
  protected readonly cursorTranslateStyle = computed(() => {
    const roundedCursorPosition = Math.round(this.cursorPosition());
    return `translateX${roundedCursorPosition}px`;
  });

  private readonly lastRafTime = linkedSignal({
    source: this.currentVersionId,
    computation: () => INITIAL_RAF_TIMER,
  });
  private readonly changeActiveVersionUseCase = inject(
    ChangeActiveVideoUseCase
  );
  private readonly messageBus = inject<MessageBus>(MESSAGE_BUS_TOKEN);
  private readonly destroyed$ = new ReplaySubject<void>();
  private readonly pointerState = signal<PointerState>("INITIAL");
  private readonly defaultView = inject(DOCUMENT).defaultView;
  private rafTimerNumber = 0;
  private assetsMap = new Map<UniqueId, HTMLImageElement | HTMLVideoElement>();

  ngOnInit(): void {
    this.setRaf();
    this.listenToAssetStateChange();
    this.listenToAssetInit();
    this.listenToAssetDestroyed();
    if (!this.defaultView) {
      throw new Error("Default view is not found");
    }
    fromEvent(this.defaultView, "resize")
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
    if (isOnSlider(event) && this.pointerState() === "POINTER_DOWN") {
      const { id, clientWidth } = event.target as HTMLDivElement;

      if (this.currentVersionId() !== +id) {
        this.changeActiveVersionUseCase.execute(+id);
      }

      const cursor = getCursor(id);
      const pos = Math.min(event.offsetX, clientWidth);
      if (cursor) {
        /** currently broken */
        this.cursorPosition.set(pos);
      }
      this.updateVideoTime(pos, clientWidth, id);
    }
  }

  public onPointerDown(event: PointerEvent): void {
    if (isOnSlider(event)) {
      this.pointerState.set("POINTER_DOWN");
      const { id, clientWidth } = event.target as HTMLDivElement;
      if (this.currentVersionId() !== +id) {
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
    this.pointerState.set("INITIAL");
  }

  public togglePlayingState() {
    const currentVersionId = this.currentVersionId();
    if (!currentVersionId) {
      return;
    }
    const video = this.getVideo(currentVersionId);
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
    if (!this.defaultView) {
      throw new Error("Default view is not found");
    }
    this.rafTimerNumber = this.defaultView.requestAnimationFrame(() => {
      const currentVersionId = this.currentVersionId();
      //cursor update section
      if (currentVersionId && this.pointerState() !== "POINTER_DOWN") {
        const currentVideo = this.getVideo(currentVersionId);
        if (currentVideo && this.lastRafTime() !== currentVideo.currentTime) {
          this.lastRafTime.set(currentVideo.currentTime);
          this.tryUpdateCursorPosition(currentVideo, currentVersionId);
        }
      }
      //on video ended handle
      if (currentVersionId) {
        const currentVideo = this.getVideo(currentVersionId);
        const closeToEnd =
          currentVideo &&
          currentVideo.duration - currentVideo.currentTime <= 0.01;

        if (closeToEnd) {
          const versions = this.videoPlaylist();
          if (versions.length > 1) {
            this.trySetNextVideo(versions, currentVersionId);
          }
        }
      }
      this.defaultView?.requestAnimationFrame(() => this.setRaf());
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
      this.cursorPosition.set(pos);
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
    const currentVersionId = this.currentVersionId();
    if (this.isPlaying() || !currentVersionId) {
      return;
    }

    const currentVideo = this.getVideo(currentVersionId);
    if (currentVideo) {
      this.tryUpdateCursorPosition(currentVideo, currentVersionId);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.defaultView?.cancelAnimationFrame(this.rafTimerNumber);
  }
}

function getSlider(id: string | number) {
  return document.getElementById(id.toString());
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
