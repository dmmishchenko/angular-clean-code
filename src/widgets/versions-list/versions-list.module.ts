import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VersionsListComponent } from "./versions-list.component";
import { AddItemToPlaylistUseCase } from "./usecases/add-item-to-playlist";
import { ChangeVersionUseCase } from "./usecases/change-version";
import { GetVersionsListUseCase } from "./usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "./usecases/remove-item-from-playlist";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import {
  GET_STATE_USE_CASE,
  PAGE_STATE_SERVICE,
  ROUTE_QUERY_STATE_SERVICE,
  SYNC_SERVICE,
  VERSIONS_REPOSITORY,
} from "@application/tokens";
import { VersionsRepository } from "@application/repositories/versions-repository";

export interface VersionsListModuleConfig {
  PAGE_STATE_SERVICE: InjectionToken<ReviewPageStateInterface>;
  SYNC_SERVICE: InjectionToken<SyncServiceInterface>;
  ROUTE_QUERY_STATE_SERVICE: InjectionToken<RouteQueryStateInterface>;
  GET_STATE_USE_CASE: InjectionToken<GetStateUseCase>;
  VERSIONS_REPOSITORY: InjectionToken<VersionsRepository>;
}

@NgModule({
  declarations: [],
  imports: [CommonModule, VersionsListComponent],
  exports: [VersionsListComponent],
  providers: [
    AddItemToPlaylistUseCase,
    ChangeVersionUseCase,
    GetVersionsListUseCase,
    RemoveItemFromPlaylistUseCase,
  ],
})
export class VersionsListWidgetModule {
  static forRoot(
    config: VersionsListModuleConfig
  ): ModuleWithProviders<VersionsListWidgetModule> {
    return {
      ngModule: VersionsListWidgetModule,
      providers: [
        { provide: PAGE_STATE_SERVICE, useExisting: config.PAGE_STATE_SERVICE },
        { provide: SYNC_SERVICE, useExisting: config.SYNC_SERVICE },
        {
          provide: ROUTE_QUERY_STATE_SERVICE,
          useExisting: config.ROUTE_QUERY_STATE_SERVICE,
        },
        { provide: GET_STATE_USE_CASE, useExisting: config.GET_STATE_USE_CASE },
        {
          provide: VERSIONS_REPOSITORY,
          useExisting: config.VERSIONS_REPOSITORY,
        },
      ],
    };
  }
}
