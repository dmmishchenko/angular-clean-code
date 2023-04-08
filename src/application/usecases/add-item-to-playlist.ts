import { Injectable } from "@angular/core";
import { take, withLatestFrom } from "rxjs";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { Usecase } from "../base/use-case";
import { GetVersionDetailUseCase } from "./get-version-detail";

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
        const newPlaylist = currentState.playlist.includes(version)
          ? currentState.playlist
          : [...currentState.playlist, version];

        this.reviewPageState.setState({
          playlist: newPlaylist,
        });
      });
  }
}
