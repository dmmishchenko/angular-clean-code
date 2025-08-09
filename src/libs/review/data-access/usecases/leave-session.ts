import { Injectable, inject } from "@angular/core";
import { Usecase } from "@shared/util/interfaces/use-case";
import { SYNC_SERVICE_TOKEN } from "../tokens";
import { SyncServiceInterface } from "@review/util/interfaces/sync-service.interface";

@Injectable({ providedIn: 'root' })
export class LeaveSessionUseCase implements Usecase {
  private syncService = inject<SyncServiceInterface>(SYNC_SERVICE_TOKEN);

  execute(): void {
    this.syncService.stop();
  }
}
