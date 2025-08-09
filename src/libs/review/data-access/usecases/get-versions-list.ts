import { Injectable, inject } from "@angular/core";
import { VersionsRepository } from "@review/util/interfaces/versions-repository.interface";
import { AssetVersion } from "@review/util/models/asset-version";
import { Usecase } from "@shared/util/interfaces/use-case";
import { Observable } from "rxjs";
import { VERSIONS_REPOSITORY_TOKEN } from "../tokens";

@Injectable({ providedIn: "root" })
export class GetVersionsListUseCase
  implements Usecase<Observable<AssetVersion[]>>
{
  private versionsRepository = inject<VersionsRepository>(
    VERSIONS_REPOSITORY_TOKEN
  );

  /**
   * execute versions load from repository
   * @param versionId - this field is used to simulate pagination load
   * @returns
   */
  execute(versionId?: number): Observable<AssetVersion[]> {
    return this.versionsRepository.getVersionsList(versionId);
  }
}
