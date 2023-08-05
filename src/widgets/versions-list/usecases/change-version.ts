import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import {
  PAGE_STATE_SERVICE,
  ROUTE_QUERY_STATE_SERVICE,
  VERSIONS_REPOSITORY,
} from "@application/tokens";
import { VERSION_ID } from "src/environments/consts";
import { ItemNotFoundError } from "src/review-page/errors/item-not-found";

@Injectable()
export class ChangeVersionUseCase implements Usecase {
  constructor(
    @Inject(PAGE_STATE_SERVICE)
    private reviewPageState: ReviewPageStateInterface,
    @Inject(VERSIONS_REPOSITORY) private versionsRepository: VersionsRepository,
    @Inject(ROUTE_QUERY_STATE_SERVICE)
    private routeQueryStateService: RouteQueryStateInterface
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
