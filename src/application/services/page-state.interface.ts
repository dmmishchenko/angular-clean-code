import { Signal } from "@angular/core";
import { PageState } from "@application/models/page-state";

export type StateChanges = {
  [key in keyof PageState]?: PageState[key];
};

export interface PageStateInterface {
  state$: Signal<PageState>;
  setState(changes: StateChanges): void;
  setSyncState(changes: StateChanges): void;
}
