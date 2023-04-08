import { Observable } from "rxjs";
import { ReviewPageState } from "src/domain/review-page-state";

export type StateChanges = {
  [key in keyof ReviewPageState]: ReviewPageState[key];
};

export interface ReviewPageStateInterface {
  state$: Observable<ReviewPageState>;
  setState(changes: StateChanges): void;
}
