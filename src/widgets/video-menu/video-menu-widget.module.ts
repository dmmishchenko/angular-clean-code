import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideoMenuComponent } from "./video-menu.component";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";
import { PageStateInterface } from "@application/services/page-state.interface";
import { MESSAGE_BUS_TOKEN, PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { MessageBus } from "@application/services/message-bus.interface";
export interface VideoMenuWidgetConfig {
  PAGE_STATE_SERVICE: InjectionToken<PageStateInterface>;
  MESSAGE_BUS: InjectionToken<MessageBus>;
}
@NgModule({
  declarations: [VideoMenuComponent],
  imports: [CommonModule],
  exports: [VideoMenuComponent],
  providers: [ChangeActiveVersionUseCase],
})
export class VideoMenuWidgetModule {
  static forRoot(
    config: VideoMenuWidgetConfig
  ): ModuleWithProviders<VideoMenuWidgetModule> {
    return {
      ngModule: VideoMenuWidgetModule,
      providers: [
        {
          provide: PAGE_STATE_SERVICE_TOKEN,
          useExisting: config.PAGE_STATE_SERVICE,
        },
        {
          provide: MESSAGE_BUS_TOKEN,
          useExisting: config.MESSAGE_BUS,
        },
      ],
    };
  }
}
