import { Injectable, inject } from "@angular/core";
import { VersionsRepository } from "@review/util/interfaces/versions-repository.interface";
import { VersionMessage } from "@review/util/models/version-message";
import { Usecase } from "@shared/util/interfaces/use-case";
import { delay, Observable, of } from "rxjs";
import { VERSIONS_REPOSITORY_TOKEN } from "../tokens";
import { UniqueId } from "@shared/util/models/unique-id";

@Injectable({ providedIn: "root" })
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  private versionsRepository = inject<VersionsRepository>(
    VERSIONS_REPOSITORY_TOKEN
  );

  execute(id: UniqueId | null): Observable<VersionMessage[]> {
    if (!id) {
      return of([]);
    }
    return this.versionsRepository.getVersionMessages(id).pipe(delay(1_000));
  }
}
