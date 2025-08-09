import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { SyncServiceInterface } from "../../util/interfaces/sync-service.interface";
import { SYNC_SERVICE_TOKEN } from "../tokens";

@Injectable({ providedIn: 'root' })
export class LeaveSessionUseCase implements Usecase {
  private syncService = inject<SyncServiceInterface>(SYNC_SERVICE_TOKEN);

  execute(): void {
    this.syncService.stop();
  }
}
