import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { VersionMessage } from "@models/version-message";
import { Observable } from "rxjs";
import { VersionsMockRepository } from "src/review-page/repositories/versions-mock.repository";

@Injectable()
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  constructor(private versionsRepository: VersionsMockRepository) {}

  execute(id: number): Observable<VersionMessage[]> {
    return this.versionsRepository.getVersionMessages(id);
  }
}
