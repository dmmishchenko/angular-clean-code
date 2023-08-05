import { Component, Input, inject } from "@angular/core";
import {
  PAGE_STATE_SERVICE_TOKEN
} from "@application/tokens";
import { map } from "rxjs";
import { MediaAssetsService } from "../../services/media-assets.service";
import { AssetVersion } from "@application/models/asset-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";

@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
})
export class MediaAssetComponent {
  @Input() version: AssetVersion | null = null;
  isActive$ = inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
    map((state) => {
      if (state.activeVersionId) {
        return this.version?.id === state.activeVersionId;
      }
      return false;
    })
  );

  public readonly versionTypes = ASSET_VERSION_TYPE;

  constructor(private mediaAssetsService: MediaAssetsService) {}

  onLoadedMetadata(event: Event) {
    const video = event.target as HTMLVideoElement;
    if (video) {
      this.mediaAssetsService.setAsset(video);
    }
  }

  onAssetLoad() {
    // empty for now
  }
}
