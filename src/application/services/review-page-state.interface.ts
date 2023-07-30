import { ReviewPageState } from "@domain/review-page-state";
import { Observable } from "rxjs";

export type StateChanges = {
  [key in keyof ReviewPageState]?: ReviewPageState[key];
};

export interface ReviewPageStateInterface {
  state$: Observable<ReviewPageState>;
  setState(changes: StateChanges): void;
  assignSyncState(changes: StateChanges): void;
}
