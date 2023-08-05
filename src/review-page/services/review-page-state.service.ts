import { Inject, Injectable, NgZone } from "@angular/core";
import {
  ReviewPageStateInterface,
  StateChanges,
} from "@application/services/review-page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import { ROUTE_QUERY_STATE_SERVICE, SYNC_SERVICE } from "@application/tokens";
import { BehaviorSubject, Observable, OperatorFunction } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { ReviewPageState } from "src/review-page/models/review-page-state";

@Injectable()
export class ReviewPageStateService implements ReviewPageStateInterface {
  private state$$ = new BehaviorSubject<ReviewPageState>({
    activeVersionId: null,
    playlist: [],
  });
  public state$: Observable<ReviewPageState> = this.state$$
    .asObservable()
    .pipe(runInZone(this.ngZone));

  constructor(
    @Inject(SYNC_SERVICE) private syncService: SyncServiceInterface,
    @Inject(ROUTE_QUERY_STATE_SERVICE)
    private routeQueryStateService: RouteQueryStateInterface,
    private ngZone: NgZone
  ) {}

  public setState(changes: StateChanges): void {
    const currentState = this.state$$.getValue();
    const newState = Object.assign(currentState, changes);

    this.state$$.next(newState);
    if (changes.activeVersionId !== undefined) {
      this.routeQueryStateService.changeState({
        [VERSION_ID]: changes.activeVersionId,
      });
    }
    if (this.syncService.isInSync) {
      this.syncService.postChange(changes);
    }
  }

  public assignSyncState(changes: StateChanges): void {
    const currentState = this.state$$.getValue();
    const newState = Object.assign(currentState, changes);

    this.state$$.next(newState);
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
