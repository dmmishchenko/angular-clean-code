import { Injectable, inject } from "@angular/core";
import { UniqueId } from "src/libs/shared/util/models/unique-id";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "../../../../shared/util/interfaces/message-bus.interface";
import { MESSAGE_BUS_TOKEN } from "src/libs/shared/tokens";

@Injectable({ providedIn: 'root' })
export class MediaAssetsService {
  private messageBus = inject<MessageBus>(MESSAGE_BUS_TOKEN);


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
