import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map } from "rxjs";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { Version } from "src/domain/version";
import { MediaAssetComponent } from "../media-asset/media-asset.component";

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
