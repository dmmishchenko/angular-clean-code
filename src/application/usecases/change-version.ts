import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";

@Injectable({ providedIn: "root" })
export class ChangeVersionUseCase implements Usecase {
  constructor(private reviewPageState: ReviewPageStateService) {}
  execute(versionId: number): void {
    this.reviewPageState.setState({ versionId });
  }
}
