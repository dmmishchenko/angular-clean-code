import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";

@Injectable()
export class ChangeActiveVersionUseCase implements Usecase {
  constructor(private reviewPageState: ReviewPageStateService) {}
  execute(versionId: number): void {
    this.reviewPageState.setState({ activeVersionId: versionId });
  }
}
