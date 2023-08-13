import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsRepository } from "@application/repositories/versions-repository";
import {
  PageStateInterface,
  StateChanges,
} from "@application/services/page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN, VERSIONS_REPOSITORY_TOKEN } from "@application/tokens";
import { take, withLatestFrom } from "rxjs";
import { PageState } from "@application/models/page-state";
import { AssetVersion } from "@application/models/asset-version";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";

@Injectable()
export class AddItemToPlaylistUseCase implements Usecase {
  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageState: PageStateInterface,
    @Inject(VERSIONS_REPOSITORY_TOKEN) private versionsRepository: VersionsRepository
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
