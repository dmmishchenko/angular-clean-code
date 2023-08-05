import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { Version } from "@application/models/version";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { VERSIONS_REPOSITORY_TOKEN } from "@application/tokens";
import { Observable } from "rxjs";

@Injectable()
export class GetVersionsListUseCase implements Usecase<Observable<Version[]>> {
  constructor(
    @Inject(VERSIONS_REPOSITORY_TOKEN) private versionsRepository: VersionsRepository
  ) {}
  /**
   * execute versions load from repository
   * @param versionId - this field is used to simulate pagination load
   * @returns
   */
  execute(versionId?: number): Observable<Version[]> {
    return this.versionsRepository.getVersionsList(versionId);
  }
}
