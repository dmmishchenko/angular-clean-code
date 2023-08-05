import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { VERSIONS_REPOSITORY } from "@application/tokens";
import { Version } from "@models/version";
import { Observable } from "rxjs";

@Injectable()
export class GetVersionsListUseCase implements Usecase<Observable<Version[]>> {
  constructor(
    @Inject(VERSIONS_REPOSITORY) private versionsRepository: VersionsRepository
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
