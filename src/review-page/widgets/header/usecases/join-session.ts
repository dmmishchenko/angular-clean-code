import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";
import { SyncService } from "src/review-page/services/sync.service";

@Injectable()
export class JoinSessionUseCase implements Usecase {
  constructor(
    private syncService: SyncService,
    private reviewPageStateService: ReviewPageStateService
  ) {}
  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.assignSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
