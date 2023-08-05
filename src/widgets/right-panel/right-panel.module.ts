import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RightPanelComponent } from "./right-panel.component";
import { GetVersionMessagesUseCase } from "./usecases/get-version-messages";

@NgModule({
  declarations: [],
  imports: [CommonModule, RightPanelComponent],
  exports: [RightPanelComponent],
  providers: [GetVersionMessagesUseCase],
})
export class RightPanelWidgetModule {}
