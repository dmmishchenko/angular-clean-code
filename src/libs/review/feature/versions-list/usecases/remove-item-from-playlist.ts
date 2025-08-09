import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import {
  PageStateInterface,
  StateChanges,
} from "../../../util/interfaces/page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "src/libs/review/util/tokens";
import { take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RemoveItemFromPlaylistUseCase implements Usecase {
  private reviewPageState = inject<PageStateInterface>(PAGE_STATE_SERVICE_TOKEN);

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
