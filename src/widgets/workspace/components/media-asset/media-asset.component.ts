import { Component, Input, inject } from "@angular/core";
import { map } from "rxjs";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { MediaAssetsService } from "../../services/media-assets.service";

@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
})
export class MediaAssetComponent {
  @Input() version: Version | null = null;
  isActive$ = inject(GetStateUseCase)
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
