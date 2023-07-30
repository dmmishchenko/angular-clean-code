import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { StateChanges } from "@application/services/review-page-state.interface";
import { take } from "rxjs";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";

@Injectable()
export class RemoveItemFromPlaylistUseCase implements Usecase {
  constructor(private reviewPageState: ReviewPageStateService) {}
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
