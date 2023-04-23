import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReviewPageState } from "@domain/review-page-state";
import { HeaderMenuComponent } from "@ui/components/header-menu/header-menu.component";
import { RightPanelComponent } from "@ui/components/right-panel/right-panel.component";
import { VersionsListComponent } from "@ui/components/versions-list/versions-list.component";
import { VideoMenuComponent } from "@ui/components/video-menu/video-menu.component";
import { WorkspaceComponent } from "@ui/components/workspace/workspace.component";
import { GetStateUseCase } from "@usecases/get-state";
import { Observable } from "rxjs";

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
}
