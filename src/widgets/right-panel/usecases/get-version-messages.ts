import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionsRepository } from "@application/repositories/versions-repository";
import { VERSIONS_REPOSITORY_TOKEN } from "@application/tokens";
import { VersionMessage } from "@application/models/version-message";
import { Observable } from "rxjs";

@Injectable()
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  constructor(
    @Inject(VERSIONS_REPOSITORY_TOKEN) private versionsRepository: VersionsRepository
  ) {}

  execute(id: number): Observable<VersionMessage[]> {
    return this.versionsRepository.getVersionMessages(id);
  }
}
