import { Injectable } from "@angular/core";
import { take, withLatestFrom } from "rxjs";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { Usecase } from "../base/use-case";
import { GetVersionDetailUseCase } from "./get-version-detail";
import { VERSION_TYPE } from "src/domain/version-type";
import { StateChanges } from "../services/review-page-state.interface";
import { ReviewPageState } from "src/domain/review-page-state";
import { Version } from "src/domain/version";

@Injectable({ providedIn: "root" })
export class AddItemToPlaylist implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private getVersion: GetVersionDetailUseCase
  ) {}
  execute(versionId: number): void {
    this.getVersion
      .execute(versionId)
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
