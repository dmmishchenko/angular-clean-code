import {
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN,
} from "@application/tokens";
import { VersionsListModuleConfig as VersionsListWidgetConfig } from "src/widgets/versions-list/versions-list.module";
import { HeaderWidgetConfig } from "../widgets/header/header-widget.module";
import { RightPanelWidgetConfig } from "../widgets/right-panel/right-panel.module";
import { VideoMenuWidgetConfig } from "../widgets/video-menu/video-menu-widget.module";
import { WorkspaceWidgetConfig } from "../widgets/workspace/workspace-widget.module";

export const VersionsListWidgetDependencies: VersionsListWidgetConfig = {
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
  SYNC_SERVICE: SYNC_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE: ROUTE_QUERY_STATE_SERVICE_TOKEN,
  VERSIONS_REPOSITORY: VERSIONS_REPOSITORY_TOKEN,
};

export const HeaderWidgetDependencies: HeaderWidgetConfig = {
  SYNC_SERVICE: SYNC_SERVICE_TOKEN,
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
};

export const RightPanelWidgetDependencies: RightPanelWidgetConfig = {
  VERSIONS_REPOSITORY: VERSIONS_REPOSITORY_TOKEN,
};

export const WorkspaceWidgetDependencies: WorkspaceWidgetConfig = {
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
};

export const VideoMenuWidgetDependencies: VideoMenuWidgetConfig = {
  PAGE_STATE_SERVICE: PAGE_STATE_SERVICE_TOKEN,
};
