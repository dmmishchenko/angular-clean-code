import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderMenuComponent } from "./header-menu.component";
import { JoinSessionUseCase } from "./usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderMenuComponent],
  exports: [HeaderMenuComponent],
  providers: [JoinSessionUseCase, LeaveSessionUseCase],
})
export class HeaderWidgetModule {}
