import { InjectionToken } from "@angular/core";
import { PageStateInterface } from "./interfaces/page-state.interface";
import { RouteQueryStateInterface } from "./interfaces/route-query-state.service";
import { SyncServiceInterface } from "./interfaces/sync-service.interface";
import { VersionsRepository } from "./interfaces/versions-repository";
import { ReviewPageStateService } from "../data-access/review-page-state/review-page-state.service";
import { SyncService } from "../data-access/sync/sync.service";
import { RouteQueryStateService } from "../data-access/route-query-state.service";
import { VersionsMockRepository } from "../data-access/versions-mock.repository";

export const PAGE_STATE_SERVICE_TOKEN = new InjectionToken<PageStateInterface>(
  "ReviewPageStateInterface",
  {
    providedIn: 'root',
    factory: () => new ReviewPageStateService()
  }
);

export const SYNC_SERVICE_TOKEN = new InjectionToken<SyncServiceInterface>(
  "SyncServiceInterface",
  {
    providedIn: 'root',
    factory: () => new SyncService()
  }
);

export const ROUTE_QUERY_STATE_SERVICE_TOKEN =
  new InjectionToken<RouteQueryStateInterface>("RouteQueryStateInterface", {
    providedIn: 'root',
    factory: () => new RouteQueryStateService()
  });

export const VERSIONS_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "VersionsRepository",
  {
    providedIn: 'root',
    factory: () => new VersionsMockRepository()
  }
);

