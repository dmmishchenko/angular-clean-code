import { Component, computed, inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
} from "@review/data-access/tokens";
import { SetActiveVersionUseCase } from "@review/data-access/usecases/set-active-version.usecase";
import { HeaderMenuComponent } from "@review/feature/header/header-menu.component";
import { RightPanelComponent } from "@review/feature/right-panel/right-panel.component";
import { VersionsListComponent } from "@review/feature/versions-list/versions-list.component";
import { VideoMenuComponent } from "@review/feature/video-menu/video-menu.component";
import { WorkspaceComponent } from "@review/feature/workspace/workspace.component";
import { map, take } from "rxjs";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
  standalone: true,
  imports: [
    VersionsListComponent,
    WorkspaceComponent,
    HeaderMenuComponent,
    RightPanelComponent,
    VideoMenuComponent,
  ],
})
export class ReviewPage implements OnInit {
  protected readonly currentVersionId = toSignal(
    inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
      map((state) => state.activeVersionId || null)
    ),
    { initialValue: null }
  );
  protected readonly playlist = toSignal(
    inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
      map((state) => state.playlist)
    ),
    { initialValue: [] }
  );

  private readonly routeQueryStateService = inject(
    ROUTE_QUERY_STATE_SERVICE_TOKEN
  );
  private readonly changeVersionUseCase = inject(SetActiveVersionUseCase);

  ngOnInit(): void {
    this.routeQueryStateService
      .getVersionIdFromRoute()
      .pipe(take(1))
      .subscribe((versionId) => {
        if (versionId) {
          this.changeVersionUseCase.execute(+versionId);
        }
      });
  }
}
