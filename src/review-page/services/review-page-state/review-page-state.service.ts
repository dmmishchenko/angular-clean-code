import { Inject, Injectable, NgZone, inject } from "@angular/core";
import {
  PageStateInterface,
  StateChanges,
} from "@application/services/page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import {
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
} from "@application/tokens";
import { BehaviorSubject, Observable, OperatorFunction } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { PageState } from "@application/models/page-state";

@Injectable()
export class ReviewPageStateService implements PageStateInterface {
  private state$$ = new BehaviorSubject<PageState>({
    activeVersionId: null,
    playlist: [],
  });
  public state$: Observable<PageState> = this.state$$
    .asObservable()
    .pipe(runInZone(inject(NgZone)));

  constructor(
    @Inject(SYNC_SERVICE_TOKEN)
    private syncService: SyncServiceInterface,
    @Inject(ROUTE_QUERY_STATE_SERVICE_TOKEN)
    private routeQueryStateService: RouteQueryStateInterface
  ) {}

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
