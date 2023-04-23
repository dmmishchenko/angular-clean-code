import { Injectable } from "@angular/core";
import { Usecase } from "../../base/use-case";
import { SyncService } from "src/data/services/sync.service";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";

@Injectable({ providedIn: "root" })
export class JoinSessionUseCase implements Usecase {
  constructor(
    private syncService: SyncService,
    private reviewPageStateService: ReviewPageStateService
  ) { }
  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.assignSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
