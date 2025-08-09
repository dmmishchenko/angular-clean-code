import { Injectable, inject } from "@angular/core";
import { Usecase } from "src/libs/shared/util/interfaces/use-case";
import { VersionsRepository } from "src/libs/review/util/interfaces/versions-repository";
import { VERSIONS_REPOSITORY_TOKEN } from "src/libs/review/util/tokens";
import { VersionMessage } from "src/libs/review/util/models/version-message";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  private versionsRepository = inject<VersionsRepository>(VERSIONS_REPOSITORY_TOKEN);


  execute(id: number): Observable<VersionMessage[]> {
    return this.versionsRepository.getVersionMessages(id);
  }
}
