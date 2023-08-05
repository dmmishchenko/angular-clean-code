import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideoMenuComponent } from "./video-menu.component";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";

@NgModule({
  declarations: [VideoMenuComponent],
  imports: [CommonModule],
  exports: [VideoMenuComponent],
  providers: [ChangeActiveVersionUseCase],
})
export class VideoMenuWidgetModule {}
