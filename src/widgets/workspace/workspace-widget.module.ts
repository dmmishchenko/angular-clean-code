import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { PageStateInterface } from "@application/services/page-state.interface";
import {
  MESSAGE_BUS_TOKEN,
  PAGE_STATE_SERVICE_TOKEN,
} from "@application/tokens";
import { MediaAssetComponent } from "./components/media-asset/media-asset.component";
import { MediaAssetsService } from "./services/media-assets.service";
import { WorkspaceComponent } from "./workspace.component";
import { MessageBus } from "@application/services/message-bus.interface";

export interface WorkspaceWidgetConfig {
  PAGE_STATE_SERVICE: InjectionToken<PageStateInterface>;
  MESSAGE_BUS: InjectionToken<MessageBus>;
}
@NgModule({
  imports: [CommonModule],
  declarations: [WorkspaceComponent, MediaAssetComponent],
  exports: [WorkspaceComponent],
  providers: [MediaAssetsService],
})
export class WorkspaceWidgetModule {
  static forRoot(
    config: WorkspaceWidgetConfig
  ): ModuleWithProviders<WorkspaceWidgetModule> {
    return {
      ngModule: WorkspaceWidgetModule,
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
