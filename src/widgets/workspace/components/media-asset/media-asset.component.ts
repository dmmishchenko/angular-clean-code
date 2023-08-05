import { Component, Input, inject } from "@angular/core";
import { GET_STATE_USE_CASE_TOKEN } from "@application/tokens";
import { map } from "rxjs";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { MediaAssetsService } from "../../services/media-assets.service";

@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
})
export class MediaAssetComponent {
  @Input() version: Version | null = null;
  isActive$ = inject(GET_STATE_USE_CASE_TOKEN)
    .execute()
    .pipe(
      map((state) => {
        if (state.activeVersionId) {
          return this.version?.id === state.activeVersionId;
        }
        return false;
      })
    );

  public readonly versionTypes = VERSION_TYPE;

  constructor(private mediaAssetsService: MediaAssetsService) {}

  onLoadedMetadata(event: Event) {
    const video = event.target as HTMLVideoElement;
    if (video) {
      this.mediaAssetsService.setAsset(video)
    }
  }

  onAssetLoad() {
    // empty for now
  }
}
