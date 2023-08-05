import { Component, inject } from "@angular/core";
import {
  PAGE_STATE_SERVICE_TOKEN
} from "@application/tokens";
import { map } from "rxjs";
import { Version } from "@application/models/version";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent {
  public playlist$ = inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
    map((state) => state.playlist)
  );

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }
}
