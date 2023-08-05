import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { JoinSessionUseCase } from "src/widgets/header/usecases/join-session";
import { map } from "rxjs";
import { LeaveSessionUseCase } from "./usecases/leave-session";

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
