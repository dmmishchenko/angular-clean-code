import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionsMockRepository } from '../../data/repositories/versions-mock.repository';
import { Version } from '../../domain/version';

@Injectable({ providedIn: 'root' })
export class GetVersionsListUseCase {
  constructor(private versionsRepository: VersionsMockRepository) {}
  execute(): Observable<Version[]> {
    return this.versionsRepository.getVersionsList();
  }
}
