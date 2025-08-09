import { Injectable, inject } from "@angular/core";
import {
  PageStateInterface,
  StateChanges,
} from "@review/util/interfaces/page-state.interface";
import { VersionsRepository } from "@review/util/interfaces/versions-repository.interface";
import { AssetVersion } from "@review/util/models/asset-version";
import { ASSET_VERSION_TYPE } from "@review/util/models/asset-version-type";
import { PageState } from "@review/util/models/page-state";
import { Usecase } from "@shared/util/interfaces/use-case";
import { withLatestFrom, take } from "rxjs";
import { PAGE_STATE_SERVICE_TOKEN, VERSIONS_REPOSITORY_TOKEN } from "../tokens";

@Injectable({ providedIn: "root" })
export class AddItemToPlaylistUseCase implements Usecase {
  private reviewPageState = inject<PageStateInterface>(
    PAGE_STATE_SERVICE_TOKEN
  );
  private versionsRepository = inject<VersionsRepository>(
    VERSIONS_REPOSITORY_TOKEN
  );

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
    currentState: PageState,
    version: AssetVersion
  ): StateChanges {
    let changes: StateChanges = {};
    const currentPlaylist = currentState.playlist;
    if (
      currentPlaylist.length === 1 &&
      currentPlaylist[0].type === ASSET_VERSION_TYPE.IMAGE
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
