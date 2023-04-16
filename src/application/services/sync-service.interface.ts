import { StateChanges } from "./review-page-state.interface";

export interface SyncServiceInterface {
  postChange(changes: StateChanges): void;
  listen(cb: (event: any) => void):void;
  stop(): void;
}
