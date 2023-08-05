import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { MediaAssetComponent } from "./components/media-asset/media-asset.component";
import { MediaAssetsService } from "./services/media-assets.service";
import { WorkspaceFacadeService } from "./services/workspace-facade.service";
import { WorkspaceComponent } from "./workspace.component";

export interface WorkspaceWidgetConfig {
  PAGE_STATE_SERVICE: InjectionToken<ReviewPageStateInterface>;
}
@NgModule({
  imports: [CommonModule],
  declarations: [WorkspaceComponent, MediaAssetComponent],
  exports: [WorkspaceComponent],
  providers: [WorkspaceFacadeService, MediaAssetsService],
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
      ],
    };
  }
}

export { WorkspaceFacadeService } from "./services/workspace-facade.service";
