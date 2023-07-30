import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { SyncService } from "src/review-page/services/sync.service";

@Injectable()
export class LeaveSessionUseCase implements Usecase {
  constructor(private syncService: SyncService) {}
  execute(): void {
    this.syncService.stop();
  }
}
