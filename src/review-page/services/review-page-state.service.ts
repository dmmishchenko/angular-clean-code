import { Inject, Injectable, NgZone } from "@angular/core";
import {
  ReviewPageStateInterface,
  StateChanges,
} from "@application/services/review-page-state.interface";
import { BehaviorSubject, Observable, OperatorFunction } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { ReviewPageState } from "src/review-page/models/review-page-state";
import { RouteQueryStateService } from "./route-query-state.service";
import { SyncService } from "./sync.service";
import { SYNC_SERVICE, ROUTE_QUERY_STATE_SERVICE } from "@application/tokens";

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
    @Inject(SYNC_SERVICE) private syncService: SyncService,
    @Inject(ROUTE_QUERY_STATE_SERVICE)
    private routeQueryStateService: RouteQueryStateService,
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
