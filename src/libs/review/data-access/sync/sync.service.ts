import { Injectable } from "@angular/core";
import { SYNC_SESSION_CHANNEL_NAME } from "src/environments/consts";
import { StateChanges } from "../../util/interfaces/page-state.interface";
import { SyncServiceInterface } from "../../util/interfaces/sync-service.interface";

@Injectable()
export class SyncService implements SyncServiceInterface {
  private channel: BroadcastChannel | null = null;

  get isInSync(): boolean {
    return !!this.channel;
  }
  
  public postChange(changes: StateChanges): void {
    if (!this.channel) {
      throw new Error(`Channel doesn't exist`);
    }
    if (this.channel) {
      this.channel.postMessage({ changes });
    }
  }

  public listen(cb: (event: MessageEvent) => void): void {
    if (this.channel) {
      throw new Error(`Channel exist already`);
    }
    this.channel = new BroadcastChannel(SYNC_SESSION_CHANNEL_NAME);
    this.channel.onmessage = cb;
  }

  public stop(): void {
    if (!this.channel) {
      throw new Error("No channel listened");
    }
    this.channel.close();
    this.channel = null;
  }
}
