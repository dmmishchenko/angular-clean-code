import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VersionMessage } from '../../domain/version-message';

@Injectable({ providedIn: 'root' })
export class GetVersionMessagesUseCase {
  execute(): Observable<VersionMessage[]> {
    return of([
      {
        author: 'Dmitriy',
        text: 'nice one',
      },
    ]);
  }
}
