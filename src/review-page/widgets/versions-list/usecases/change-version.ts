import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VERSION_ID } from "src/environments/consts";
import { ItemNotFoundError } from "src/review-page/errors/item-not-found";
import { VersionsMockRepository } from "src/review-page/repositories/versions-mock.repository";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";
import { RouteQueryStateService } from "src/review-page/services/route-query-state.service";

@Injectable()
export class ChangeVersionUseCase implements Usecase {
  constructor(
    private reviewPageState: ReviewPageStateService,
    private versionsRepository: VersionsMockRepository,
    private routeQueryStateService: RouteQueryStateService
  ) {}
  execute(versionId: number): void {
    this.versionsRepository.getVersionDetail(versionId).subscribe(
      (activeVersion) => {
        this.reviewPageState.setState({
          activeVersionId: versionId,
          playlist: [activeVersion],
        });
      },
      (err) => {
        if (err instanceof ItemNotFoundError) {
          this.routeQueryStateService.changeState({
            [VERSION_ID]: null,
          });
        }
      }
    );
  }
}
