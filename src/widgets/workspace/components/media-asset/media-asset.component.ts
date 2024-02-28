import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  computed,
  inject,
} from "@angular/core";
import { AssetVersion } from "@application/models/asset-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import {
  ASSET_STATE,
  MediaAssetsService,
} from "../../services/media-assets.service";

const DELAY_TIME_MS = 500;
@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
})
export class MediaAssetComponent implements AfterViewInit, OnDestroy {
  @Input() version: AssetVersion | null = null;
  @ViewChild("asset") assetRef: ElementRef<
    HTMLImageElement | HTMLVideoElement
  > | null = null;

  public pageState = inject(PAGE_STATE_SERVICE_TOKEN);
  public isActive$ = computed(() => {
    const state = this.pageState.state$();
    if (state.activeVersionId) {
      return this.version?.id === state.activeVersionId;
    }
    return false;
  });

  public readonly versionTypes = ASSET_VERSION_TYPE;

  constructor(private mediaAssetsService: MediaAssetsService) {}

  ngAfterViewInit(): void {
    if (this.assetRef && this.version) {
      this.mediaAssetsService.emitAssetElement(
        this.version.id,
        this.assetRef.nativeElement
      );
    }
  }

  onAssetLoad() {
    setTimeout(() => {
      if (this.version) {
        this.mediaAssetsService.emitAssetState(
          this.version.id,
          ASSET_STATE.LOADED
        );
      }
    }, DELAY_TIME_MS);
  }

  ngOnDestroy(): void {
    if (this.assetRef && this.version) {
      this.mediaAssetsService.emitAssetDestroyed(this.version.id);
    }
  }
}
