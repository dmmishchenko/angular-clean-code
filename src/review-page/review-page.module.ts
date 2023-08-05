import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  GET_STATE_USE_CASE_TOKEN,
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN,
} from "@application/tokens";
import {
  HeaderWidgetConfig,
  HeaderWidgetModule,
} from "../widgets/header/header-widget.module";
import {
  RightPanelWidgetConfig,
  RightPanelWidgetModule,
} from "../widgets/right-panel/right-panel.module";
import {
  VersionsListModuleConfig,
  VersionsListWidgetModule,
} from "../widgets/versions-list/versions-list.module";
import {
  VideoMenuWidgetConfig,
  VideoMenuWidgetModule,
} from "../widgets/video-menu/video-menu-widget.module";
import {
  WorkspaceWidgetConfig,
  WorkspaceWidgetModule,
} from "../widgets/workspace/workspace-widget.module";
import { VersionsMockRepository } from "./repositories/versions-mock.repository";
import { ReviewPageRoutingModule } from "./review-page-routing.module";
import { ReviewPage } from "./review-page.component";
import { ReviewPageStateService } from "./services/review-page-state.service";
import { RouteQueryStateService } from "./services/route-query-state.service";
import { SyncService } from "./services/sync.service";
import { GetStateUseCase } from "./usecases/get-state";

const VersionsListWidgetConfig: VersionsListModuleConfig = {
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
  SYNC_SERVICE: SYNC_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE: ROUTE_QUERY_STATE_SERVICE_TOKEN,
  GET_STATE_USE_CASE: GET_STATE_USE_CASE_TOKEN,
  VERSIONS_REPOSITORY: VERSIONS_REPOSITORY_TOKEN,
};

const HeaderWidgetConfig: HeaderWidgetConfig = {
  SYNC_SERVICE: SYNC_SERVICE_TOKEN,
  GET_STATE_USE_CASE: GET_STATE_USE_CASE_TOKEN,
};

const RightPanelWidgetConfig: RightPanelWidgetConfig = {
  VERSIONS_REPOSITORY: VERSIONS_REPOSITORY_TOKEN,
};

const WorkspaceWidgetConfig: WorkspaceWidgetConfig = {
  GET_STATE_USE_CASE: GET_STATE_USE_CASE_TOKEN,
};

const VideoMenuWidgetConfig: VideoMenuWidgetConfig = {
  GET_STATE_USE_CASE: GET_STATE_USE_CASE_TOKEN,
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
};

@NgModule({
  imports: [
    CommonModule,
    ReviewPageRoutingModule,
    VersionsListWidgetModule.forRoot(VersionsListWidgetConfig),
    WorkspaceWidgetModule.forRoot(WorkspaceWidgetConfig),
    HeaderWidgetModule.forRoot(HeaderWidgetConfig),
    RightPanelWidgetModule.forRoot(RightPanelWidgetConfig),
    VideoMenuWidgetModule.forRoot(VideoMenuWidgetConfig),
  ],
  declarations: [ReviewPage],
  providers: [
    { provide: PAGE_STATE_SERVICE_TOKEN, useClass: ReviewPageStateService },
    { provide: SYNC_SERVICE_TOKEN, useClass: SyncService },
    { provide: ROUTE_QUERY_STATE_SERVICE_TOKEN, useClass: RouteQueryStateService },
    { provide: GET_STATE_USE_CASE_TOKEN, useClass: GetStateUseCase },
    { provide: VERSIONS_REPOSITORY_TOKEN, useClass: VersionsMockRepository },
  ],
})
export class ReviewPageModule {}
