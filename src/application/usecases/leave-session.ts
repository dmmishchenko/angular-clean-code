import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { SyncService } from "src/data/services/sync.service";

@Injectable({ providedIn: "root" })
export class LeaveSessionUseCase implements Usecase {
  constructor(private syncService: SyncService) {}
  execute(): void {
    this.syncService.stop();
  }
}
