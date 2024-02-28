import { Inject, Injectable, WritableSignal, signal } from "@angular/core";
import { PageState } from "@application/models/page-state";
import {
  PageStateInterface,
  StateChanges,
} from "@application/services/page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import { SyncServiceInterface } from "@application/services/sync-service.interface";
import {
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
} from "@application/tokens";
import { VERSION_ID } from "src/environments/consts";

@Injectable()
export class ReviewPageStateService implements PageStateInterface {
  private state$$: WritableSignal<PageState> = signal({
    activeVersionId: null,
    playlist: [],
  });

  public state$ = this.state$$.asReadonly();

  constructor(
    @Inject(SYNC_SERVICE_TOKEN)
    private syncService: SyncServiceInterface,
    @Inject(ROUTE_QUERY_STATE_SERVICE_TOKEN)
    private routeQueryStateService: RouteQueryStateInterface
  ) {}

  public setState(changes: StateChanges): void {
    this.validateChanges(changes);
    this.assignChanges(changes);

    if (this.syncService.isInSync) {
      this.syncService.postChange(changes);
    }
  }

  public setSyncState(changes: StateChanges): void {
    this.validateChanges(changes);
    this.assignChanges(changes);
  }

  private validateChanges(changes: StateChanges) {
    const props = Object.getOwnPropertyNames(changes);
    if (props.length === 0) {
      throw new Error("Empty state changes");
    }
  }

  private assignChanges(changes: StateChanges): void {
    this.state$$.update((currentValue) => {
      return { ...currentValue, ...changes };
    });

    if (changes.activeVersionId !== undefined) {
      this.routeQueryStateService.changeState({
        [VERSION_ID]: changes.activeVersionId,
      });
    }
  }
}
