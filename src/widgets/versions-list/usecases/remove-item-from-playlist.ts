import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import {
  ReviewPageStateInterface,
  StateChanges,
} from "@application/services/review-page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { take } from "rxjs";

@Injectable()
export class RemoveItemFromPlaylistUseCase implements Usecase {
  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageState: ReviewPageStateInterface
  ) {}
  execute(removedId: number): void {
    this.reviewPageState.state$.pipe(take(1)).subscribe((currentState) => {
      const newPlaylist = currentState.playlist.filter(
        (version) => version.id !== removedId
      );

      const changes: StateChanges = {
        playlist: newPlaylist,
      };
      if (removedId === currentState.activeVersionId) {
        if (changes.playlist?.length) {
          changes.activeVersionId = changes.playlist[0].id;
        } else {
          changes.activeVersionId = null;
        }
      }
      this.reviewPageState.setState(changes);
    });
  }
}
