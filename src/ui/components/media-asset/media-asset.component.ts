import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Version } from "@domain/version";
import { VERSION_TYPE } from "@domain/version-type";
import { GetStateUseCase } from "@usecases/get-state";
import { map } from "rxjs";

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
