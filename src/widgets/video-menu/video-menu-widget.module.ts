import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideoMenuComponent } from "./video-menu.component";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { GET_STATE_USE_CASE, PAGE_STATE_SERVICE } from "@application/tokens";
export interface VideoMenuWidgetConfig {
  GET_STATE_USE_CASE: InjectionToken<GetStateUseCase>;
  PAGE_STATE_SERVICE: InjectionToken<ReviewPageStateInterface>;
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
        { provide: GET_STATE_USE_CASE, useExisting: config.GET_STATE_USE_CASE },
        { provide: PAGE_STATE_SERVICE, useExisting: config.PAGE_STATE_SERVICE },
      ],
    };
  }
}
