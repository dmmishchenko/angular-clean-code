import { Version } from '../../domain/version';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface VersionsRepository {
  getVersionsList(): Observable<Version[]>;
}

export const VERSION_REPOSITORY_TOKEN = new InjectionToken<VersionsRepository>(
  'version repository token'
);
