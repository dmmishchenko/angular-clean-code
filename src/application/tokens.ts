import { InjectionToken } from "@angular/core";
import { VersionsRepository } from "./repositories/versions-repository";
import { PageStateInterface } from "./services/page-state.interface";
import { RouteQueryStateInterface } from "./services/route-query-state.service";
import { SyncServiceInterface } from "./services/sync-service.interface";

export const PAGE_STATE_SERVICE_TOKEN = new InjectionToken<PageStateInterface>(
  "ReviewPageStateInterface"
);

export const SYNC_SERVICE_TOKEN = new InjectionToken<SyncServiceInterface>(
  "SyncServiceInterface"
);

export const ROUTE_QUERY_STATE_SERVICE_TOKEN =
  new InjectionToken<RouteQueryStateInterface>("RouteQueryStateInterface");

export const VERSIONS_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "VersionsRepository"
);

