import { Injectable, inject } from "@angular/core";
import { PageStateInterface } from "@review/util/interfaces/page-state.interface";
import { RouteQueryStateInterface } from "@review/util/interfaces/route-query-state.interface";
import { VersionsRepository } from "@review/util/interfaces/versions-repository.interface";
import { ItemNotFoundError } from "@shared/util/errors/item-not-found";
import { Usecase } from "@shared/util/interfaces/use-case";
import { VERSION_ID } from "src/environments/consts";
import {
  PAGE_STATE_SERVICE_TOKEN,
  VERSIONS_REPOSITORY_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
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
