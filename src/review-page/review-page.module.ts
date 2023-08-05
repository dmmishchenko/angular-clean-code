import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  GET_STATE_USE_CASE,
  PAGE_STATE_SERVICE,
  ROUTE_QUERY_STATE_SERVICE,
  SYNC_SERVICE,
  VERSIONS_REPOSITORY,
} from "@application/tokens";
import { HeaderWidgetModule } from "../widgets/header/header-widget.module";
import { RightPanelWidgetModule } from "../widgets/right-panel/right-panel.module";
import { VersionsListWidgetModule } from "../widgets/versions-list/versions-list.module";
import { VideoMenuWidgetModule } from "../widgets/video-menu/video-menu-widget.module";
import { WorkspaceWidgetModule } from "../widgets/workspace/workspace-widget.module";
import { VersionsMockRepository } from "./repositories/versions-mock.repository";
import { ReviewPageRoutingModule } from "./review-page-routing.module";
import { ReviewPage } from "./review-page.component";
import { ReviewPageStateService } from "./services/review-page-state.service";
import { RouteQueryStateService } from "./services/route-query-state.service";
import { SyncService } from "./services/sync.service";
import { GetStateUseCase } from "./usecases/get-state";

@NgModule({
  imports: [
    CommonModule,
    ReviewPageRoutingModule,
    VersionsListWidgetModule.forRoot({
      PAGE_STATE_SERVICE,
      SYNC_SERVICE,
      ROUTE_QUERY_STATE_SERVICE,
      GET_STATE_USE_CASE,
    }),
    WorkspaceWidgetModule,
    HeaderWidgetModule,
    RightPanelWidgetModule,
    VideoMenuWidgetModule,
  ],
  declarations: [ReviewPage],
  providers: [
    { provide: PAGE_STATE_SERVICE, useClass: ReviewPageStateService },
    { provide: SYNC_SERVICE, useClass: SyncService },
    { provide: ROUTE_QUERY_STATE_SERVICE, useClass: RouteQueryStateService },
    { provide: GET_STATE_USE_CASE, useClass: GetStateUseCase },
    { provide: VERSIONS_REPOSITORY, useClass: VersionsMockRepository },
    ReviewPageStateService,
    SyncService,
    RouteQueryStateService,
    GetStateUseCase,
    VersionsMockRepository,
  ],
})
export class ReviewPageModule {}
