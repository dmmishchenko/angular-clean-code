import { Injectable, inject } from "@angular/core";
import { VersionsRepository } from "@review/util/interfaces/versions-repository.interface";
import { VersionMessage } from "@review/util/models/version-message";
import { Usecase } from "@shared/util/interfaces/use-case";
import { Observable } from "rxjs";
import { VERSIONS_REPOSITORY_TOKEN } from "../tokens";

@Injectable({ providedIn: "root" })
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  private versionsRepository = inject<VersionsRepository>(
    VERSIONS_REPOSITORY_TOKEN
  );

  execute(id: number): Observable<VersionMessage[]> {
    return this.versionsRepository.getVersionMessages(id);
  }
}
