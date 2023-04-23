import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Version } from "@domain/version";
import { GetStateUseCase } from "@usecases/get-state";
import { map } from "rxjs";
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
