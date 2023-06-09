import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
import { map } from "rxjs";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { JoinSessionUseCase } from "src/application/usecases/join-session";
import { LeaveSessionUseCase } from "src/application/usecases/leave-session";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderMenuComponent implements OnDestroy {
  public readonly activeVersionName$ = inject(GetStateUseCase)
    .execute()
    .pipe(
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
