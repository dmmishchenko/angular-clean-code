import { CommonModule } from "@angular/common";
import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EMPTY, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { UniqueId } from "src/review-page/models/unique-id";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { RouteQueryStateService } from "src/review-page/services/route-query-state.service";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { AddItemToPlaylistUseCase } from "./usecases/add-item-to-playlist";
import { ChangeVersionUseCase } from "./usecases/change-version";
import { GetVersionsListUseCase } from "./usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "./usecases/remove-item-from-playlist";
import { GET_STATE_USE_CASE, ROUTE_QUERY_STATE_SERVICE } from "@application/tokens";


@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VersionsListComponent implements OnInit, OnDestroy {
  @Input() currentVersionId: number | null = null;
  public readonly versionTypes = VERSION_TYPE;
  public versions$: Observable<never> | Observable<Version[]> = EMPTY;

  private playlist: Version[] = [];
  private destroyed$ = new Subject<void>();

  constructor(
    @Inject(GET_STATE_USE_CASE)
    private getState: GetStateUseCase,
    @Inject(ROUTE_QUERY_STATE_SERVICE)
    private routeQueryStateService: RouteQueryStateService,
    private addItemToPlaylist: AddItemToPlaylistUseCase,
    private removeItemFromPlaylist: RemoveItemFromPlaylistUseCase,
    private changeVersionUseCase: ChangeVersionUseCase,
    private getVersionsListUseCase: GetVersionsListUseCase
  ) {}

  ngOnInit(): void {
    this.routeQueryStateService
      .getVersionIdFromRoute()
      .pipe(take(1))
      .subscribe((versionId) => {
        if (versionId) {
          //load and set as active
          this.versions$ = this.getVersionsListUseCase.execute(+versionId).pipe(
            tap(() => {
              this.changeVersion(+versionId);
            })
          );
        } else {
          this.versions$ = this.getVersionsListUseCase.execute();
        }
      });

    this.getState
      .execute()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.playlist = state.playlist;
      });
  }

  public changeVersion(id: UniqueId): void {
    this.changeVersionUseCase.execute(id);
  }

  public isInPlaylist(versionId: number): boolean {
    return (
      this.playlist.length > 1 &&
      this.playlist.some((item) => item.id === versionId)
    );
  }

  public itemSelectionChanged(selected: boolean, version: Version) {
    if (selected) {
      this.addItemToPlaylist.execute(version.id);
    } else {
      this.removeItemFromPlaylist.execute(version.id);
    }
  }

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
