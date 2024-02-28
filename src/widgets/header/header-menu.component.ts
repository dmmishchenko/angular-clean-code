import { CommonModule } from "@angular/common";
import { Component, OnDestroy, Signal, computed, inject } from "@angular/core";
import { PageState } from "@application/models/page-state";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { JoinSessionUseCase } from "src/widgets/header/usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderMenuComponent implements OnDestroy {
  state$: Signal<PageState> = inject(PAGE_STATE_SERVICE_TOKEN).state$;

  public readonly activeVersionName$: Signal<string | null> = computed(() => {
    const { activeVersionId, playlist } = this.state$();
    if (activeVersionId) {
      const activeItem = playlist.find((item) => item.id === activeVersionId);
      if (activeItem) {
        return activeItem.name;
      }
    }
    return null;
  });

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
