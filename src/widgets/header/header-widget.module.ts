import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import {
  PAGE_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
} from "@application/tokens";
import { HeaderMenuComponent } from "./header-menu.component";
import { JoinSessionUseCase } from "./usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";

export interface HeaderWidgetConfig {
  SYNC_SERVICE: InjectionToken<SyncServiceInterface>;
  PAGE_STATE_SERVICE: InjectionToken<ReviewPageStateInterface>;
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
        { provide: SYNC_SERVICE_TOKEN, useExisting: config.SYNC_SERVICE },
        {
          provide: PAGE_STATE_SERVICE_TOKEN,
          useExisting: config.PAGE_STATE_SERVICE,
        },
      ],
    };
  }
}
