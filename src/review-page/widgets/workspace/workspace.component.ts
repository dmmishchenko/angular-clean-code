import { Component, inject } from "@angular/core";
import { map } from "rxjs";
import { Version } from "src/review-page/models/version";
import { GetStateUseCase } from "src/review-page/usecases/get-state";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent {
  public playlist$ = inject(GetStateUseCase)
    .execute()
    .pipe(map((state) => state.playlist));

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }
}
