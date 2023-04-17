import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ChangeVersionUseCase } from "src/application/usecases/change-version";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { ReviewPageState } from "src/domain/review-page-state";
import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { RightPanelComponent } from "../../components/right-panel/right-panel.component";
import { ChangeActiveVersionUseCase } from "src/application/usecases/change-active-version";
import { VersionsListComponent } from "src/ui/components/versions-list/versions-list.component";
import { VideoMenuComponent } from "src/ui/components/video-menu/video-menu.component";
import { WorkspaceComponent } from "src/ui/components/workspace/workspace.component";

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
    VideoMenuComponent,
  ],
})
export class ReviewPage {
  state$: Observable<ReviewPageState> = inject(GetStateUseCase).execute();

  constructor(
    private changeVersionUseCase: ChangeVersionUseCase,
    private changeActiveVersionUseCase: ChangeActiveVersionUseCase
  ) {}

  processVersionChange(id: number) {
    this.changeVersionUseCase.execute(id);
  }
  public processActiveVersionChange(activeVersionId: number) {
    this.changeActiveVersionUseCase.execute(activeVersionId);
  }
}
