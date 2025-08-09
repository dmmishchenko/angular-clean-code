import { Injectable } from "@angular/core";
import {
  MessageBus,
  MessageEvent,
} from "@shared/util/interfaces/message-bus.interface";
import { Observable, Subject, filter } from "rxjs";

@Injectable()
export class MessageBusService implements MessageBus {
  private bus$ = new Subject<MessageEvent>();

  post(action: string, body: any): void {
    this.bus$.next({ action, body });
  }

  listen(): Observable<MessageEvent> {
    return this.bus$.asObservable();
  }

  fromAction(action: string): Observable<MessageEvent> {
    return this.bus$.pipe(filter((m) => m != null && m.action === action));
  }
}
