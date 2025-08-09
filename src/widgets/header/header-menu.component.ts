import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
import {
  PAGE_STATE_SERVICE_TOKEN
} from "@application/tokens";
import { map } from "rxjs";
import { JoinSessionUseCase } from "src/widgets/header/usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";

@Component({
    selector: "header-menu",
    templateUrl: "./header-menu.component.html",
    styleUrls: ["./header-menu.component.scss"],
    imports: [CommonModule]
})
export class HeaderMenuComponent implements OnDestroy {
  public readonly activeVersionName$ = inject(
    PAGE_STATE_SERVICE_TOKEN
  ).state$.pipe(
    map((state) => {
      if (state.activeVersionId) {
        const activeItem = state.playlist.find(
          (item) => item.id === state.activeVersionId
        );
        if (activeItem) {
          return activeItem.name;
        }
      }
      return null;
    })
  );
  public isInSync: boolean = false;

  constructor(
    private joinSessionUseCase: JoinSessionUseCase,
    private leadeSessionUseCase: LeaveSessionUseCase
  ) {}

  public joinSync() {
    try {
      this.joinSessionUseCase.execute();
      this.isInSync = true;
    } catch (error) {
      console.error(error);
    }
  }

  public leaveSync() {
    this.leadeSessionUseCase.execute();
    this.isInSync = false;
  }

  ngOnDestroy(): void {
    this.leaveSync();
  }
}
