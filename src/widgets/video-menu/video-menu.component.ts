import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import {
  MESSAGE_BUS_TOKEN,
  PAGE_STATE_SERVICE_TOKEN,
} from "@application/tokens";
import { Subject, distinctUntilChanged, map, takeUntil } from "rxjs";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";
import { AssetVersion } from "@application/models/asset-version";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@application/services/message-bus.interface";
import { ASSET_STATE } from "../workspace/services/media-assets.service";

const LOADING_CLASS = "loading";
@Component({
  selector: "video-menu",
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
})
export class VideoMenuComponent implements OnInit, OnDestroy {
  @Input() currentVersionId: number | null = null;
  private destroyed$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
