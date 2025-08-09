import { Observable } from "rxjs";
import { PageState } from "../models/page-state";

export type StateChanges = {
  [key in keyof PageState]?: PageState[key];
};

export interface PageStateInterface {
  state$: Observable<PageState>;
  setState(changes: StateChanges): void;
  setSyncState(changes: StateChanges): void;
}
