import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { PageStateInterface } from "@application/services/page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";

@Injectable()
export class ChangeActiveVersionUseCase implements Usecase {
  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageState: PageStateInterface
  ) {}
  execute(versionId: number): void {
    this.reviewPageState.setState({ activeVersionId: versionId });
  }
}
