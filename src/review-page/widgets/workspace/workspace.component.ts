import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Version } from "src/review-page/models/version";
import { MediaAssetComponent } from "src/review-page/widgets/workspace/components/media-asset/media-asset.component";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { map } from "rxjs";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
  standalone: true,
  imports: [CommonModule, MediaAssetComponent],
})
export class WorkspaceComponent {
  public playlist$ = inject(GetStateUseCase)
    .execute()
    .pipe(map((state) => state.playlist));

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }
}
