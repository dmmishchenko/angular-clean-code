import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { SYNC_SERVICE_TOKEN } from "@application/tokens";

@Injectable()
export class LeaveSessionUseCase implements Usecase {
  constructor(
    @Inject(SYNC_SERVICE_TOKEN) private syncService: SyncServiceInterface
  ) {}
  execute(): void {
    this.syncService.stop();
  }
}
