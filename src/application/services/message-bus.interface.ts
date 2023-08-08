import { Observable } from "rxjs";

export interface MessageBus {
  post(action: string, body: any): void;
  listen(): Observable<MessageEvent>;
  fromAction(action: string): Observable<MessageEvent>;
}

export interface MessageEvent {
  action: string;
  body: any;
}

export enum MESSAGE_ACTION {
  ASSET_STATE_CHANGED = "ASSET_STATE_CHANGED",
}
