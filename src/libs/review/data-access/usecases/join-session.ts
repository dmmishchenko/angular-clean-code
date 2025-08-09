import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { PageStateInterface } from "../../util/interfaces/page-state.interface";
import { SyncServiceInterface } from "../../util/interfaces/sync-service.interface";
import { PAGE_STATE_SERVICE_TOKEN, SYNC_SERVICE_TOKEN } from "../tokens";

@Injectable({ providedIn: 'root' })
export class JoinSessionUseCase implements Usecase {
  private syncService = inject<SyncServiceInterface>(SYNC_SERVICE_TOKEN);
  private reviewPageStateService = inject<PageStateInterface>(PAGE_STATE_SERVICE_TOKEN);

  execute(): void {
    const cb = (event: MessageEvent) => {
      const { changes } = event.data;
      this.reviewPageStateService.setSyncState(changes);
    };

    this.syncService.listen(cb);
  }
}
