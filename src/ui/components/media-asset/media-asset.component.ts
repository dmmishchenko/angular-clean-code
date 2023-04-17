import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { map } from "rxjs";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { Version } from "src/domain/version";
import { VERSION_TYPE } from "src/domain/version-type";

@Component({
  selector: "media-asset",
  templateUrl: "./media-asset.component.html",
  styleUrls: ["./media-asset.component.scss"],
  standalone: true,
  imports: [CommonModule],
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
}
