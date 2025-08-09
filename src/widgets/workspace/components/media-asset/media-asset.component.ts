import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from "@angular/core";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { map } from "rxjs";
import {
  ASSET_STATE,
  MediaAssetsService,
} from "../../services/media-assets.service";
import { AssetVersion } from "@application/models/asset-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";

const DELAY_TIME_MS = 500;
@Component({
    selector: "media-asset",
    templateUrl: "./media-asset.component.html",
    styleUrls: ["./media-asset.component.scss"],
    standalone: false
})
export class MediaAssetComponent implements AfterViewInit, OnDestroy {
  @Input() version: AssetVersion | null = null;
  @ViewChild("asset") assetRef: ElementRef<
    HTMLImageElement | HTMLVideoElement
  > | null = null;

  public isActive$ = inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
    map((state) => {
      if (state.activeVersionId) {
        return this.version?.id === state.activeVersionId;
      }
      return false;
    })
  );
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
