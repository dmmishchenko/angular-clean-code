import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { PAGE_STATE_SERVICE, SYNC_SERVICE } from "@application/tokens";

@Injectable()
export class JoinSessionUseCase implements Usecase {
  constructor(
    @Inject(SYNC_SERVICE) private syncService: SyncServiceInterface,
    @Inject(PAGE_STATE_SERVICE)
    private reviewPageStateService: ReviewPageStateInterface
  ) {}
  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.assignSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
