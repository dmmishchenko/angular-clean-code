import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { Version } from "@application/models/version";
import { VersionMessage } from "@application/models/version-message";

export interface VersionsRepository {
  getVersionsList(id?: number): Observable<Version[]>;
  getVersionDetail(id: number): Observable<Version>;
  getVersionMessages(id: number): Observable<VersionMessage[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "version repository token"
);
