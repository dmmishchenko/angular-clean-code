import { Injectable, NgZone } from "@angular/core";
import {
  ReviewPageStateInterface,
  StateChanges,
} from "@application/services/review-page-state.interface";
import { ReviewPageState } from "src/review-page/models/review-page-state";
import { BehaviorSubject, Observable, OperatorFunction } from "rxjs";
import { SyncService } from "./sync.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VERSION_ID } from "src/environments/consts";

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
    private syncService: SyncService,
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public setState(changes: StateChanges): void {
    const currentState = this.state$$.getValue();
    const newState = Object.assign(currentState, changes);

    this.state$$.next(newState);
    if (changes.activeVersionId !== undefined) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          [VERSION_ID]: changes.activeVersionId,
        },
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
