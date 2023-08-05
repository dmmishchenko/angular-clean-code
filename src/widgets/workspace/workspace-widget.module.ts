import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { MediaAssetComponent } from "./components/media-asset/media-asset.component";
import { MediaAssetsService } from "./services/media-assets.service";
import { WorkspaceFacadeService } from "./services/workspace-facade.service";
import { WorkspaceComponent } from "./workspace.component";
import { GetStateUseCase } from "../../review-page/usecases/get-state";
import { GET_STATE_USE_CASE_TOKEN } from "@application/tokens";

export interface WorkspaceWidgetConfig {
  GET_STATE_USE_CASE: InjectionToken<GetStateUseCase>;
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
        { provide: GET_STATE_USE_CASE_TOKEN, useExisting: config.GET_STATE_USE_CASE },
      ],
    };
  }
}

export { WorkspaceFacadeService } from "./services/workspace-facade.service";
