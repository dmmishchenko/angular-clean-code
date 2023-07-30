import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { Version } from "@models/version";
import { Observable } from "rxjs";
import { VersionsMockRepository } from "src/review-page/repositories/versions-mock.repository";

@Injectable()
export class GetVersionsListUseCase implements Usecase<Observable<Version[]>> {
  constructor(private versionsRepository: VersionsMockRepository) {}
  execute(): Observable<Version[]> {
    return this.versionsRepository.getVersionsList();
  }
}
