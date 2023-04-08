import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  ReviewPageStateInterface,
  StateChanges,
} from "src/application/services/review-page-state.interface";
import { ReviewPageState } from "src/domain/review-page-state";

@Injectable({ providedIn: "root" })
export class ReviewPageStateService implements ReviewPageStateInterface {
  private state$$ = new BehaviorSubject<ReviewPageState>({ versionId: null });
  public state$: Observable<ReviewPageState> = this.state$$.asObservable();

  setState(changes: StateChanges): void {
    const currentState = this.state$$.getValue();
    const newState = Object.assign(currentState, changes);

    this.state$$.next(newState);
  }
}
