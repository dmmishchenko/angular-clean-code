import { Component, Input, inject } from "@angular/core";
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
})
export class MediaAssetComponent {
  @Input() version: AssetVersion | null = null;

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


  onAssetLoad() {
    setTimeout(() => {
      if (this.version) {
        this.mediaAssetsService.setAssetState(
          this.version.id,
          ASSET_STATE.LOADED
        );
      }
    }, DELAY_TIME_MS);
  }
}
