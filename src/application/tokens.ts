import { InjectionToken } from "@angular/core";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { ReviewPageStateInterface } from "./services/review-page-state.interface";
import { RouteQueryStateInterface } from "./services/route-query-state.service";
import { SyncServiceInterface } from "./services/sync-service.interface";
import { VersionsRepository } from "./repositories/versions-repository";

export const PAGE_STATE_SERVICE_TOKEN = new InjectionToken<ReviewPageStateInterface>(
  "ReviewPageStateInterface"
);

export const SYNC_SERVICE_TOKEN = new InjectionToken<SyncServiceInterface>(
  "SyncServiceInterface"
);

export const ROUTE_QUERY_STATE_SERVICE_TOKEN =
  new InjectionToken<RouteQueryStateInterface>("RouteQueryStateInterface");

export const GET_STATE_USE_CASE_TOKEN = new InjectionToken<GetStateUseCase>(
  "GetStateUseCase"
);

export const VERSIONS_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "VersionsRepository"
);

