import { Component, inject } from "@angular/core";
import { GET_STATE_USE_CASE_TOKEN } from "@application/tokens";
import { map } from "rxjs";
import { Version } from "src/review-page/models/version";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent {
  public playlist$ = inject(GET_STATE_USE_CASE_TOKEN)
    .execute()
    .pipe(map((state) => state.playlist));

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }
}
