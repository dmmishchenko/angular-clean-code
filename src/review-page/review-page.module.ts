import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  GET_STATE_USE_CASE,
  PAGE_STATE_SERVICE,
  ROUTE_QUERY_STATE_SERVICE,
  SYNC_SERVICE,
  VERSIONS_REPOSITORY,
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
  PAGE_STATE_SERVICE,
  SYNC_SERVICE,
  ROUTE_QUERY_STATE_SERVICE,
  GET_STATE_USE_CASE,
  VERSIONS_REPOSITORY,
};

const HeaderWidgetConfig: HeaderWidgetConfig = {
  SYNC_SERVICE,
  GET_STATE_USE_CASE,
};

const RightPanelWidgetConfig: RightPanelWidgetConfig = {
  VERSIONS_REPOSITORY,
};

const WorkspaceWidgetConfig: WorkspaceWidgetConfig = {
  GET_STATE_USE_CASE,
};

const VideoMenuWidgetConfig: VideoMenuWidgetConfig = {
  GET_STATE_USE_CASE,
  PAGE_STATE_SERVICE,
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
    { provide: PAGE_STATE_SERVICE, useClass: ReviewPageStateService },
    { provide: SYNC_SERVICE, useClass: SyncService },
    { provide: ROUTE_QUERY_STATE_SERVICE, useClass: RouteQueryStateService },
    { provide: GET_STATE_USE_CASE, useClass: GetStateUseCase },
    { provide: VERSIONS_REPOSITORY, useClass: VersionsMockRepository },
  ],
})
export class ReviewPageModule {}
