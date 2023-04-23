import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsMockRepository } from "@data/repositories/versions-mock.repository";
import { ReviewPageStateService } from "@data/services/review-page-state.service";


@Injectable({ providedIn: "root" })
export class ChangeVersionUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private versionsRepository: VersionsMockRepository
  ) { }
  execute(versionId: number): void {
    this.versionsRepository.getVersionDetail(versionId).subscribe((activeVersion) => {
      this.reviewPageState.setState({ activeVersionId: versionId, playlist: [activeVersion] });
    });
  }
}
