import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { AssetVersion } from "@application/models/asset-version";
import { VersionMessage } from "@application/models/version-message";

export interface VersionsRepository {
  getVersionsList(id?: number): Observable<AssetVersion[]>;
  getVersionDetail(id: number): Observable<AssetVersion>;
  getVersionMessages(id: number): Observable<VersionMessage[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  "version repository token"
);
