import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import {
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN
} from "@application/tokens";
import { AddItemToPlaylistUseCase } from "./usecases/add-item-to-playlist";
import { ChangeVersionUseCase } from "./usecases/change-version";
import { GetVersionsListUseCase } from "./usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "./usecases/remove-item-from-playlist";
import { VersionsListComponent } from "./versions-list.component";

export interface VersionsListModuleConfig {
  PAGE_STATE_SERVICE: InjectionToken<ReviewPageStateInterface>;
  SYNC_SERVICE: InjectionToken<SyncServiceInterface>;
  ROUTE_QUERY_STATE_SERVICE: InjectionToken<RouteQueryStateInterface>;
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
        {
          provide: PAGE_STATE_SERVICE_TOKEN,
          useExisting: config.PAGE_STATE_SERVICE,
        },
        { provide: SYNC_SERVICE_TOKEN, useExisting: config.SYNC_SERVICE },
        {
          provide: ROUTE_QUERY_STATE_SERVICE_TOKEN,
          useExisting: config.ROUTE_QUERY_STATE_SERVICE,
        },
        {
          provide: VERSIONS_REPOSITORY_TOKEN,
          useExisting: config.VERSIONS_REPOSITORY,
        },
      ],
    };
  }
}
