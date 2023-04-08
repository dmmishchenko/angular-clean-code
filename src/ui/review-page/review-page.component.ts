import { Component, OnInit } from '@angular/core';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { VersionsListComponent } from '../versions-list/versions-list.component';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  standalone: true,
  imports: [
    VersionsListComponent,
    WorkspaceComponent,
    HeaderMenuComponent,
    RightPanelComponent,
  ],
})
export class ReviewPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
