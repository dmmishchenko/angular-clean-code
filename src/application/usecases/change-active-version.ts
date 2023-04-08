import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { GetVersionDetailUseCase } from "./get-version-detail";
import { Observable } from "rxjs";
import { Version } from "src/domain/version";

@Injectable({ providedIn: "root" })
export class ChangeActiveVersionUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private getVersion: GetVersionDetailUseCase
  ) {}
  execute(versionId: number): Observable<Version> {
    this.reviewPageState.setState({ versionId });
    return this.getVersion.execute(versionId);
  }
}
