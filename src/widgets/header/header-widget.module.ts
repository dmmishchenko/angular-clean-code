import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { GET_STATE_USE_CASE, SYNC_SERVICE } from "@application/tokens";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { HeaderMenuComponent } from "./header-menu.component";
import { JoinSessionUseCase } from "./usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";

export interface HeaderWidgetConfig {
  SYNC_SERVICE: InjectionToken<SyncServiceInterface>;
  GET_STATE_USE_CASE: InjectionToken<GetStateUseCase>;
}

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderMenuComponent],
  exports: [HeaderMenuComponent],
  providers: [JoinSessionUseCase, LeaveSessionUseCase],
})
export class HeaderWidgetModule {
  static forRoot(
    config: HeaderWidgetConfig
  ): ModuleWithProviders<HeaderWidgetModule> {
    return {
      ngModule: HeaderWidgetModule,
      providers: [
        { provide: SYNC_SERVICE, useExisting: config.SYNC_SERVICE },
        { provide: GET_STATE_USE_CASE, useExisting: config.GET_STATE_USE_CASE },
      ],
    };
  }
}
