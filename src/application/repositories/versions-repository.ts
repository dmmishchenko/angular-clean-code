import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { Version } from "src/review-page/models/version";
import { VersionMessage } from "src/review-page/models/version-message";

export interface VersionsRepository {
  getVersionsList(): Observable<Version[]>;
  getVersionDetail(id: number): Observable<Version>;
  getVersionMessages(id: number): Observable<VersionMessage[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "version repository token"
);
