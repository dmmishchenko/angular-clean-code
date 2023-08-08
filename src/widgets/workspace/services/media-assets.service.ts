import { Inject, Injectable } from "@angular/core";
import { AssetVersion } from "@application/models/asset-version";
import { UniqueId } from "@application/models/unique-id";
import {
  MESSAGE_ACTION,
  MessageBus,
} from "@application/services/message-bus.interface";
import { MESSAGE_BUS_TOKEN } from "@application/tokens";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MediaAssetsService {
  private assetsStatesMap$ = new Map<UniqueId, BehaviorSubject<ASSET_STATE>>();

  constructor(@Inject(MESSAGE_BUS_TOKEN) private messageBus: MessageBus) {}

  public initialize(playlist$: Observable<AssetVersion[]>): void {
    playlist$.subscribe((playlist) => {
      const oldMap = this.assetsStatesMap$;
      const newMap = new Map<UniqueId, BehaviorSubject<ASSET_STATE>>();

      playlist.forEach((version) => {
        const itemInMap = oldMap.get(version.id);
        if (itemInMap) {
          newMap.set(version.id, itemInMap);
        } else {
          newMap.set(
            version.id,
            new BehaviorSubject<ASSET_STATE>(ASSET_STATE.INITIAL)
          );
        }
      });
      this.assetsStatesMap$ = newMap;
    });
  }

  public setAssetState(id: UniqueId, state: ASSET_STATE): void {
    const itemInMap = this.assetsStatesMap$.get(id);
    if (!itemInMap) {
      throw new Error(`No asset with id: ${id} in Map`);
    }
    itemInMap.next(state);
    this.messageBus.post(MESSAGE_ACTION.ASSET_STATE_CHANGED, { id, state });
  }

  public getAssetState$(id: UniqueId): Observable<ASSET_STATE> | undefined {
    return this.assetsStatesMap$.get(id)?.asObservable();
  }
}

export enum ASSET_STATE {
  INITIAL,
  LOADING,
  LOADED,
  ERROR,
}
