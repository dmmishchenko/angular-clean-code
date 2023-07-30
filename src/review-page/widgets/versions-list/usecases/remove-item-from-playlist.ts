import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { take } from "rxjs";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";

@Injectable()
export class RemoveItemFromPlaylistUseCase implements Usecase {
  constructor(private reviewPageState: ReviewPageStateService) {}
  execute(versionId: number): void {
    this.reviewPageState.state$.pipe(take(1)).subscribe((currentState) => {
      const newPlaylist = currentState.playlist.filter(
        (version) => version.id === versionId
      );

      this.reviewPageState.setState({
        playlist: newPlaylist,
      });
    });
  }
}
