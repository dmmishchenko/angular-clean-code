import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RightPanelComponent } from "./right-panel.component";
import { GetVersionMessagesUseCase } from "./usecases/get-version-messages";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { VERSIONS_REPOSITORY } from "@application/tokens";

export interface RightPanelWidgetConfig {
  VERSIONS_REPOSITORY: InjectionToken<VersionsRepository>;
}
@NgModule({
  declarations: [],
  imports: [CommonModule, RightPanelComponent],
  exports: [RightPanelComponent],
  providers: [GetVersionMessagesUseCase],
})
export class RightPanelWidgetModule {
  static forRoot(
    config: RightPanelWidgetConfig
  ): ModuleWithProviders<RightPanelWidgetModule> {
    return {
      ngModule: RightPanelWidgetModule,
      providers: [
        {
          provide: VERSIONS_REPOSITORY,
          useExisting: config.VERSIONS_REPOSITORY,
        },
      ],
    };
  }
}
