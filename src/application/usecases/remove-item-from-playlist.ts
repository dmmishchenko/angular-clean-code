import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { Usecase } from "../base/use-case";

@Injectable({ providedIn: "root" })
export class RemoveItemFromPlaylist implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
  ) {}
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
