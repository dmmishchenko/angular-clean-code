import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { Version } from "src/domain/version";
import { Observable } from "rxjs";
import { VersionsMockRepository } from "src/data/repositories/versions-mock.repository";

@Injectable({ providedIn: "root" })
export class GetVersionDetailUseCase implements Usecase<Observable<Version>> {
  constructor(private versionsRepository: VersionsMockRepository) {}

  execute(id: number): Observable<Version> {
    return this.versionsRepository.getVersionDetail(id);
  }
}
