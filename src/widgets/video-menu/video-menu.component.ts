import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { AssetVersion } from "@application/models/asset-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@application/services/message-bus.interface";
import {
  MESSAGE_BUS_TOKEN,
  PAGE_STATE_SERVICE_TOKEN,
} from "@application/tokens";
import { Subject, distinctUntilChanged, map, takeUntil } from "rxjs";
import { ASSET_STATE } from "../workspace/services/media-assets.service";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";

const LOADING_CLASS = "loading";
const VIDEO_DIGITS_ROUND = 5;

@Component({
  selector: "video-menu",
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
})
export class VideoMenuComponent implements OnInit, OnDestroy {
  @Input() currentVersionId: number | null = null;

  private destroyed$ = new Subject<void>();
  private state: "INITIAL" | "POINTER_DOWN" = "INITIAL";

  public videoPlaylist$ = inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
    map((state) =>
      state.playlist.filter((item) => item.type === ASSET_VERSION_TYPE.VIDEO)
    ),
    distinctUntilChanged((prev, curr) => {
      return JSON.stringify(prev) === JSON.stringify(curr);
    }),
    takeUntil(this.destroyed$)
  );

  constructor(
    private changeActiveVersionUseCase: ChangeActiveVersionUseCase,
    @Inject(MESSAGE_BUS_TOKEN) private messageBus: MessageBus
  ) {}

  ngOnInit(): void {
    this.listenToAssetStateChange();
  }

  public trackByFunc(_: number, item: AssetVersion) {
    return item.id;
  }

  public changeVideo(versionId: number) {
    this.changeActiveVersionUseCase.execute(versionId);
  }

  public onPointerMove(event: PointerEvent): void {
    if (isOnSlider(event) && this.state === "POINTER_DOWN") {
      const { id, clientWidth } = event.target as HTMLDivElement;

      if (this.currentVersionId !== +id) {
        this.changeActiveVersionUseCase.execute(+id);
      }

      const slider = getSlider(id);
      const pos = event.offsetX;
      if (slider) {
        slider.style.transform = `translateX(${pos}px)`;
      }
      this.updateVideoTime(pos, clientWidth, id);
    }
  }

  public onPointerDown(event: PointerEvent): void {
    if (isOnSlider(event)) {
      this.state = "POINTER_DOWN";
      const { id, clientWidth } = event.target as HTMLDivElement;
      if (this.currentVersionId !== +id) {
        this.changeActiveVersionUseCase.execute(+id);
      }

      const slider = getSlider(id);
      const pos = event.offsetX;
      if (slider) {
        slider.style.transform = `translateX(${pos}px)`;
      }
      this.updateVideoTime(pos, clientWidth, id);
    }
  }
  @HostListener("document:pointerup", ["$event"])
  public onPointerUp() {
    this.state = "INITIAL";
  }

  private listenToAssetStateChange() {
    this.messageBus
      .fromAction(MESSAGE_ACTION.ASSET_STATE_CHANGED)
      .subscribe((message) => {
        const { id, state } = message.body;
        if (state === ASSET_STATE.LOADED) {
          const slider = document.getElementById(id);
          if (slider) {
            slider.classList.remove(LOADING_CLASS);
          }
        }
      });
  }

  private updateVideoTime(pos: number, clientWidth: number, id: string) {
    const timePercentage = getTimePercentageFromPosition(pos, clientWidth);
    const video = document.getElementById(
      `videoAsset_${id}`
    ) as HTMLVideoElement | null;
    if (video && video.duration) {
      const newTime = +(timePercentage * video.duration).toFixed(VIDEO_DIGITS_ROUND);
      video.currentTime = newTime;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

function getSlider(id: string) {
  return document.getElementById(`slider_${id}`);
}

function getTimePercentageFromPosition(pos: number, clientWidth: number):number {
  return +(pos / clientWidth).toFixed(VIDEO_DIGITS_ROUND);
}

function isOnSlider(event: PointerEvent): boolean {
  const divTarget = event.target as HTMLDivElement;
  return divTarget && !!divTarget.id && divTarget.classList.contains("slider");
}
