import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { GetVersionDetailUseCase } from "./get-version-detail";

@Injectable({ providedIn: "root" })
export class ChangeVersionUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private getVersion: GetVersionDetailUseCase
  ) {}
  execute(versionId: number): void {
    this.getVersion.execute(versionId).subscribe((activeVersion) => {
      this.reviewPageState.setState({ activeVersionId: versionId, playlist: [activeVersion] });
    });
  }
}
