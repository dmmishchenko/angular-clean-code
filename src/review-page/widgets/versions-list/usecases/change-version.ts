import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsMockRepository } from "src/review-page/repositories/versions-mock.repository";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";

@Injectable()
export class ChangeVersionUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private versionsRepository: VersionsMockRepository
  ) {}
  execute(versionId: number): void {
    this.versionsRepository
      .getVersionDetail(versionId)
      .subscribe((activeVersion) => {
        this.reviewPageState.setState({
          activeVersionId: versionId,
          playlist: [activeVersion],
        });
      });
  }
}
