import { ReviewPageState } from "src/review-page/models/review-page-state";
import { Observable } from "rxjs";

export type StateChanges = {
  [key in keyof ReviewPageState]?: ReviewPageState[key];
};

export interface ReviewPageStateInterface {
  state$: Observable<ReviewPageState>;
  setState(changes: StateChanges): void;
  assignSyncState(changes: StateChanges): void;
}
