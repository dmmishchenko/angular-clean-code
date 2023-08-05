import { StateChanges } from "./page-state.interface";

export interface SyncServiceInterface {
  isInSync: boolean;

  postChange(changes: StateChanges): void;

  listen(cb: (event: any) => void):void;
  
  stop(): void;
}
