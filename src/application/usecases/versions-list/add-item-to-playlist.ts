import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { StateChanges } from "@application/services/review-page-state.interface";
import { VersionsMockRepository } from "@data/repositories/versions-mock.repository";
import { ReviewPageStateService } from "@data/services/review-page-state.service";
import { ReviewPageState } from "@domain/review-page-state";
import { Version } from "@domain/version";
import { VERSION_TYPE } from "@domain/version-type";
import { take, withLatestFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class AddItemToPlaylistUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private versionsRepository: VersionsMockRepository
  ) { }
  execute(versionId: number): void {

    this.versionsRepository.getVersionDetail(versionId)
      .pipe(withLatestFrom(this.reviewPageState.state$), take(1))
      .subscribe(([version, currentState]) => {
        const changes = this.getChanges(currentState, version);

        this.reviewPageState.setState(changes);
      });
  }

  private getChanges(
    currentState: ReviewPageState,
    version: Version
  ): StateChanges {
    let changes: StateChanges = {};
    const currentPlaylist = currentState.playlist;
    if (
      currentPlaylist.length === 1 &&
      currentPlaylist[0].type === VERSION_TYPE.IMAGE
    ) {
      changes = {
        activeVersionId: version.id,
        playlist: [version],
      };
    } else if (currentPlaylist.length === 0 && !currentState.activeVersionId) {
      changes = {
        activeVersionId: version.id,
        playlist: [version],
      };
    } else {
      const newPlaylist = currentPlaylist.includes(version)
        ? currentState.playlist
        : [...currentState.playlist, version];
      changes = {
        playlist: newPlaylist,
      };
    }
    return changes;
  }
}
