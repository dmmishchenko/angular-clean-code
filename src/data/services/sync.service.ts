import { Injectable } from "@angular/core";
import { SYNC_SESSION_CHANNEL_NAME } from "src/application/base/consts";
import { StateChanges } from "src/application/services/review-page-state.interface";
import { SyncServiceInterface } from "src/application/services/sync-service.interface";

@Injectable({ providedIn: "root" })
export class SyncService implements SyncServiceInterface {
  private channel: BroadcastChannel | null = null;

  get isInSync(): boolean {
    return !!this.channel;
  }
  public postChange(changes: StateChanges): void {
    if (!this.channel) {
      console.error(`Channel doesn't exist`);
      return;
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
    this.channel?.close();
    this.channel = null;
  }
}
