import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VersionsMockRepository } from "src/data/repositories/versions-mock.repository";
import { VersionMessage } from "../../domain/version-message";
import { Usecase } from "../base/use-case";

@Injectable({ providedIn: "root" })
export class GetVersionMessagesUseCase
  implements Usecase<Observable<VersionMessage[]>>
{
  constructor(private versionsRepository: VersionsMockRepository) {}

  execute(id: number): Observable<VersionMessage[]> {
    return this.versionsRepository.getVersionMessages(id);
  }
}
