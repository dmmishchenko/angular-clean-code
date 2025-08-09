import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  viewChild,
} from "@angular/core";

import { AssetVersion } from "src/libs/review/util/models/asset-version";
import { ASSET_VERSION_TYPE } from "src/libs/review/util/models/asset-version-type";
import { UniqueId } from "src/libs/shared/util/models/unique-id";
import {
  ASSET_STATE,
  MediaAssetsService,
} from "../../../feature/workspace/services/media-assets.service";

const DELAY_TIME_MS = 500;
@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
  standalone: true,
})
export class MediaAssetComponent implements AfterViewInit, OnDestroy {
  private mediaAssetsService = inject(MediaAssetsService);

  readonly version = input.required<AssetVersion>();
  readonly currentVersionId = input.required<UniqueId | null>();
  readonly assetRef = viewChild<ElementRef<
    HTMLImageElement | HTMLVideoElement
  > | null>("asset");
  readonly isActive = computed(() => {
    const currentVersionId = this.currentVersionId();
    const versionId = this.version().id;
    return currentVersionId === versionId;
  });

  public readonly versionTypes = ASSET_VERSION_TYPE;

  ngAfterViewInit(): void {
    const version = this.version();
    const assetRef = this.assetRef();
    if (assetRef && version) {
      this.mediaAssetsService.emitAssetElement(
        version.id,
        assetRef.nativeElement
      );
    }
  }

  onAssetLoad() {
    setTimeout(() => {
      const version = this.version();
      if (version) {
        this.mediaAssetsService.emitAssetState(version.id, ASSET_STATE.LOADED);
      }
    }, DELAY_TIME_MS);
  }

  ngOnDestroy(): void {
    const version = this.version();
    if (this.assetRef() && version) {
      this.mediaAssetsService.emitAssetDestroyed(version.id);
    }
  }
}
