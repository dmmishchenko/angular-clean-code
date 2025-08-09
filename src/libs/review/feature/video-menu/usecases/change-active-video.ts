import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { PageStateInterface } from "../../../util/interfaces/page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "src/libs/review/util/tokens";

@Injectable({ providedIn: 'root' })
export class ChangeActiveVideoUseCase implements Usecase {
  private reviewPageState = inject<PageStateInterface>(PAGE_STATE_SERVICE_TOKEN);

  execute(versionId: number): void {
    this.reviewPageState.setState({ activeVersionId: versionId });
  }
}
