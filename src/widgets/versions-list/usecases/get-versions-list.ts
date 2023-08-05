import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { AssetVersion } from "@application/models/asset-version";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { VERSIONS_REPOSITORY_TOKEN } from "@application/tokens";
import { Observable } from "rxjs";

@Injectable()
export class GetVersionsListUseCase implements Usecase<Observable<AssetVersion[]>> {
  constructor(
    @Inject(VERSIONS_REPOSITORY_TOKEN) private versionsRepository: VersionsRepository
  ) {}
  /**
   * execute versions load from repository
   * @param versionId - this field is used to simulate pagination load
   * @returns
   */
  execute(versionId?: number): Observable<AssetVersion[]> {
    return this.versionsRepository.getVersionsList(versionId);
  }
}
