import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { VersionsRepository } from "src/libs/review/util/interfaces/versions-repository.interface";

import { VERSION_ID } from "src/environments/consts";
import { ItemNotFoundError } from "src/libs/shared/util/errors/item-not-found";
import { PageStateInterface } from "../../util/interfaces/page-state.interface";
import { RouteQueryStateInterface } from "../../util/interfaces/route-query-state.interface";
import {
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN,
} from "../tokens";

@Injectable({ providedIn: "root" })
export class SetActiveVersionUseCase implements Usecase {
  private reviewPageState = inject<PageStateInterface>(
    PAGE_STATE_SERVICE_TOKEN
  );
  private versionsRepository = inject<VersionsRepository>(
    VERSIONS_REPOSITORY_TOKEN
  );
  private routeQueryStateService = inject<RouteQueryStateInterface>(
    ROUTE_QUERY_STATE_SERVICE_TOKEN
  );

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
