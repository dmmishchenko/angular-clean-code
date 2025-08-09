import { Inject, Injectable, NgZone, inject } from "@angular/core";
import {
  PageStateInterface,
  StateChanges,
} from "../../util/interfaces/page-state.interface";
import { RouteQueryStateInterface } from "../../util/interfaces/route-query-state.interface";
import { SyncServiceInterface } from "../../util/interfaces/sync-service.interface";
import { BehaviorSubject, Observable, OperatorFunction } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { PageState } from "src/libs/review/util/models/page-state";
import { SYNC_SERVICE_TOKEN, ROUTE_QUERY_STATE_SERVICE_TOKEN } from "../tokens";

@Injectable()
export class ReviewPageStateService implements PageStateInterface {
  private state$$ = new BehaviorSubject<PageState>({
    activeVersionId: null,
    playlist: [],
  });
  public state$: Observable<PageState> = this.state$$
    .asObservable()
    .pipe(runInZone(inject(NgZone)));
  private syncService: SyncServiceInterface = inject(SYNC_SERVICE_TOKEN);
  private routeQueryStateService: RouteQueryStateInterface = inject(
    ROUTE_QUERY_STATE_SERVICE_TOKEN
  );

  public setState(changes: StateChanges): void {
    this.validateChanges(changes);
    this.assignChanges(changes);

    if (this.syncService.isInSync) {
      this.syncService.postChange(changes);
    }
  }

  public setSyncState(changes: StateChanges): void {
    this.validateChanges(changes);
    this.assignChanges(changes);
  }

  private validateChanges(changes: StateChanges) {
    const props = Object.getOwnPropertyNames(changes);
    if (props.length === 0) {
      throw new Error("Empty state changes");
    }
  }

  private assignChanges(changes: StateChanges): void {
    const currentState = this.state$$.getValue();
    const newState = Object.assign(currentState, changes);
    this.state$$.next(newState);

    if (changes.activeVersionId !== undefined) {
      this.routeQueryStateService.changeState({
        [VERSION_ID]: changes.activeVersionId,
      });
    }
  }
}

/**
 * Custom OperatorFunction that makes sure that all lifecycle hooks of an Observable
 * are run in the NgZone.
 */
function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable((observer) => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}
