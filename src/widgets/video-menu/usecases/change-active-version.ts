import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";

@Injectable()
export class ChangeActiveVersionUseCase implements Usecase {
  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageState: ReviewPageStateInterface
  ) {}
  execute(versionId: number): void {
    this.reviewPageState.setState({ activeVersionId: versionId });
  }
}
