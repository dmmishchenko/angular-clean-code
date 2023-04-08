import { Version } from "../../domain/version";
import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { VersionMessage } from "src/domain/version-message";

export interface VersionsRepository {
  getVersionsList(): Observable<Version[]>;
  getVersionDetail(id: number): Observable<Version>;
  getVersionMessages(id: number): Observable<VersionMessage[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "version repository token"
);
