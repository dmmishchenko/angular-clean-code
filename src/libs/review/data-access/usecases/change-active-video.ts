import { Injectable, inject } from "@angular/core";
import { Usecase } from "@shared/util/interfaces/use-case";
import { PAGE_STATE_SERVICE_TOKEN } from "../tokens";
import { PageStateInterface } from "@review/util/interfaces/page-state.interface";

@Injectable({ providedIn: 'root' })
export class ChangeActiveVideoUseCase implements Usecase {
  private reviewPageState = inject<PageStateInterface>(PAGE_STATE_SERVICE_TOKEN);

  execute(versionId: number): void {
    this.reviewPageState.setState({ activeVersionId: versionId });
  }
}
