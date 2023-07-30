import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReviewPageRoutingModule } from "./review-page-routing.module";
import { ReviewPage } from "./review-page.component";
import { ReviewPageStateService } from "./services/review-page-state.service";
import { HeaderWidgetModule } from "./widgets/header/header-widget.module";
import { RightPanelWidgetModule } from "./widgets/right-panel/right-panel.module";
import { VersionsListWidgetModule } from "./widgets/versions-list/versions-list.module";
import { VideoMenuWidgetModule } from "./widgets/video-menu/video-menu-widget.module";
import { WorkspaceWidgetModule } from "./widgets/workspace/workspace-widget.module";
import { SyncService } from "./services/sync.service";
import { GetStateUseCase } from "./usecases/get-state";
import { RouteQueryStateService } from "./services/route-query-state.service";

@NgModule({
  imports: [
    CommonModule,
    ReviewPageRoutingModule,
    VersionsListWidgetModule,
    WorkspaceWidgetModule,
    HeaderWidgetModule,
    RightPanelWidgetModule,
    VideoMenuWidgetModule,
  ],
  declarations: [ReviewPage],
  providers: [
    ReviewPageStateService,
    SyncService,
    RouteQueryStateService,
    GetStateUseCase,
  ],
})
export class ReviewPageModule {}
