import { Injectable, inject } from "@angular/core";
import { Usecase } from "@shared/util/interfaces/use-case";
import { PAGE_STATE_SERVICE_TOKEN, SYNC_SERVICE_TOKEN } from "../tokens";
import { PageStateInterface } from "@review/util/interfaces/page-state.interface";
import { SyncServiceInterface } from "@review/util/interfaces/sync-service.interface";

@Injectable({ providedIn: "root" })
export class JoinSessionUseCase implements Usecase {
  private syncService = inject<SyncServiceInterface>(SYNC_SERVICE_TOKEN);
  private reviewPageStateService = inject<PageStateInterface>(
    PAGE_STATE_SERVICE_TOKEN
  );

  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.setSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
