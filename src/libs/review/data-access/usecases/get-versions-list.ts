import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { AssetVersion } from "src/libs/review/util/models/asset-version";
import { VersionsRepository } from "src/libs/review/util/interfaces/versions-repository.interface";
import { VERSIONS_REPOSITORY_TOKEN } from "../tokens";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetVersionsListUseCase implements Usecase<Observable<AssetVersion[]>> {
  private versionsRepository = inject<VersionsRepository>(VERSIONS_REPOSITORY_TOKEN);

  /**
   * execute versions load from repository
   * @param versionId - this field is used to simulate pagination load
   * @returns
   */
  execute(versionId?: number): Observable<AssetVersion[]> {
    return this.versionsRepository.getVersionsList(versionId);
  }
}
