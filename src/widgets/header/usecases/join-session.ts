import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { PageStateInterface } from "@application/services/page-state.interface";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { PAGE_STATE_SERVICE_TOKEN, SYNC_SERVICE_TOKEN } from "@application/tokens";

@Injectable()
export class JoinSessionUseCase implements Usecase {
  constructor(
    @Inject(SYNC_SERVICE_TOKEN) private syncService: SyncServiceInterface,
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageStateService: PageStateInterface
  ) {}
  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.setSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
