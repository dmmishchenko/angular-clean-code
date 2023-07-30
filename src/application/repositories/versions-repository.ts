import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { Version } from "@domain/version";
import { VersionMessage } from "@domain/version-message";

export interface VersionsRepository {
  getVersionsList(): Observable<Version[]>;
  getVersionDetail(id: number): Observable<Version>;
  getVersionMessages(id: number): Observable<VersionMessage[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "version repository token"
);
