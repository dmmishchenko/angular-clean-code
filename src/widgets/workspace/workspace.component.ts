import { Component, computed, inject } from "@angular/core";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent {
  public pageState = inject(PAGE_STATE_SERVICE_TOKEN)
  public playlist$ = computed(()=>{
    return this.pageState.state$().playlist
  })
}
