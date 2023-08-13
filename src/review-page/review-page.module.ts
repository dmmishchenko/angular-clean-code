import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  MESSAGE_BUS_TOKEN,
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN,
} from "@application/tokens";
import {
  HeaderWidgetModule
} from "../widgets/header/header-widget.module";
import {
  RightPanelWidgetModule
} from "../widgets/right-panel/right-panel.module";
import {
  VersionsListWidgetModule
} from "../widgets/versions-list/versions-list.module";
import {
  VideoMenuWidgetModule
} from "../widgets/video-menu/video-menu-widget.module";
import {
  WorkspaceWidgetModule
} from "../widgets/workspace/workspace-widget.module";
import { VersionsMockRepository } from "./repositories/versions-mock.repository";
import { ReviewPageRoutingModule } from "./review-page-routing.module";
import { ReviewPage } from "./review-page.component";
import { ReviewPageStateService } from "./services/review-page-state/review-page-state.service";
import { RouteQueryStateService } from "./services/route-query-state.service";
import { SyncService } from "./services/sync/sync.service";
import {
  HeaderWidgetDependencies,
  RightPanelWidgetDependencies,
  VersionsListWidgetDependencies,
  VideoMenuWidgetDependencies,
  WorkspaceWidgetDependencies,
} from "./widgets_dependencies";
import { MessageBusService } from "./services/message-bus.service";

@NgModule({
  imports: [
    CommonModule,
    ReviewPageRoutingModule,
    VersionsListWidgetModule.forRoot(VersionsListWidgetDependencies),
    WorkspaceWidgetModule.forRoot(WorkspaceWidgetDependencies),
    HeaderWidgetModule.forRoot(HeaderWidgetDependencies),
    RightPanelWidgetModule.forRoot(RightPanelWidgetDependencies),
    VideoMenuWidgetModule.forRoot(VideoMenuWidgetDependencies),
  ],
  declarations: [ReviewPage],
  providers: [
    { provide: PAGE_STATE_SERVICE_TOKEN, useClass: ReviewPageStateService },
    { provide: SYNC_SERVICE_TOKEN, useClass: SyncService },
    {
      provide: ROUTE_QUERY_STATE_SERVICE_TOKEN,
      useClass: RouteQueryStateService,
    },
    { provide: VERSIONS_REPOSITORY_TOKEN, useClass: VersionsMockRepository },
    { provide: MESSAGE_BUS_TOKEN, useClass: MessageBusService },
  ],
})
export class ReviewPageModule {}
