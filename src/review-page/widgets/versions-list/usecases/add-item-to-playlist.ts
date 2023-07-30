import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { StateChanges } from "@application/services/review-page-state.interface";
import { take, withLatestFrom } from "rxjs";
import { ReviewPageState } from "src/review-page/models/review-page-state";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { VersionsMockRepository } from "src/review-page/repositories/versions-mock.repository";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";

@Injectable()
export class AddItemToPlaylistUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private versionsRepository: VersionsMockRepository
  ) {}
  execute(versionId: number): void {
    this.versionsRepository
      .getVersionDetail(versionId)
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
