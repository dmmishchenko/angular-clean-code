import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VersionsMockRepository } from "../../../data/repositories/versions-mock.repository";
import { Version } from "../../../domain/version";
import { Usecase } from "../../base/use-case";

@Injectable({ providedIn: "root" })
export class GetVersionsListUseCase implements Usecase<Observable<Version[]>> {
  constructor(private versionsRepository: VersionsMockRepository) { }
  execute(): Observable<Version[]> {
    return this.versionsRepository.getVersionsList();
  }
}
