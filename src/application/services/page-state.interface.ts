import { PageState } from "@application/models/page-state";
import { Observable } from "rxjs";

export type StateChanges = {
  [key in keyof PageState]?: PageState[key];
};

export interface PageStateInterface {
  state$: Observable<PageState>;
  setState(changes: StateChanges): void;
  setSyncState(changes: StateChanges): void;
}
