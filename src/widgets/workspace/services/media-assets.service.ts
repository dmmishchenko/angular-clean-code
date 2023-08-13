import { Inject, Injectable } from "@angular/core";
import { UniqueId } from "@application/models/unique-id";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@application/services/message-bus.interface";
import { MESSAGE_BUS_TOKEN } from "@application/tokens";

@Injectable()
export class MediaAssetsService {
  constructor(@Inject(MESSAGE_BUS_TOKEN) private messageBus: MessageBus) {}

  public emitAssetState(id: UniqueId, state: ASSET_STATE): void {
    this.messageBus.post(MESSAGE_ACTION.ASSET_STATE_CHANGED, { id, state });
  }

  public emitAssetElement(
    id: number,
    element: HTMLImageElement | HTMLVideoElement
  ): void {
    this.messageBus.post(MESSAGE_ACTION.ASSET_INIT, { id, element });
  }

  public emitAssetDestroyed(id: number) {
    this.messageBus.post(MESSAGE_ACTION.ASSET_DESTROYED, { id });
  }
}

export enum ASSET_STATE {
  INITIAL,
  LOADING,
  LOADED,
  ERROR,
}
