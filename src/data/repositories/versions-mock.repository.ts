import { Version } from '../../domain/version';
import { VersionType } from '../../domain/version-type';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { VersionsRepository } from '../../application/repositories/versions-repository';

@Injectable({ providedIn: 'root' })
export class VersionsMockRepository implements VersionsRepository {
  getVersionsList(): Observable<Version[]> {
    return of([
      {
        id: 1,
        type: VersionType.VIDEO,
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        name: 'Blender Video',
      },
      {
        id: 2,
        type: VersionType.IMAGE,
        url: 'https://picsum.photos/1000/600',
        name: 'Random Image',
      },
    ]);
  }
}
