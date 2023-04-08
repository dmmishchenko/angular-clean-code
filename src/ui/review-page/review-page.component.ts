import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ChangeActiveVersionUseCase } from "src/application/usecases/change-active-version";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { ReviewPageState } from "src/domain/review-page-state";
import { HeaderMenuComponent } from "../header-menu/header-menu.component";
import { RightPanelComponent } from "../right-panel/right-panel.component";
import { VersionsListComponent } from "../versions-list/versions-list.component";
import { WorkspaceComponent } from "../workspace/workspace.component";
import { Version } from "src/domain/version";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    VersionsListComponent,
    WorkspaceComponent,
    HeaderMenuComponent,
    RightPanelComponent,
  ],
})
export class ReviewPage {
  state$: Observable<ReviewPageState> = inject(GetStateUseCase).execute();
  constructor(private changeVersionUseCase: ChangeActiveVersionUseCase) {}

  processVersionChange(id: number) {
    this.changeVersionUseCase.execute(id);
  }
}
