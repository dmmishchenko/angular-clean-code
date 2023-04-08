import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
})
export class WorkspaceComponent implements OnInit {
  currentUrl: string = '';
  constructor() {}

  ngOnInit() {}
}
