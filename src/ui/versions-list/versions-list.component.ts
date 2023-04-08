import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UniqueId } from '../../domain/unique-id';
import { GetVersionsListUseCase } from '../../application/usecases/get-versions-list';
import { ChangeVersionUseCase } from '../../application/usecases/change-version';

@Component({
  selector: 'versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class VersionsListComponent {
  versions$ = inject(GetVersionsListUseCase).execute();
  constructor() {}

  selectVersion(id: UniqueId): void {
    const res = ChangeVersionUseCase(id);
    console.log(res);
  }
}
