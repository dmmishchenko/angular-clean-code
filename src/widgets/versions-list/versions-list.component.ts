import { CommonModule } from "@angular/common";
import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PageStateInterface } from "@application/services/page-state.interface";
import { RouteQueryStateInterface } from "@application/services/route-query-state.service";
import {
  PAGE_STATE_SERVICE_TOKEN,
  ROUTE_QUERY_STATE_SERVICE_TOKEN
} from "@application/tokens";
import { EMPTY, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { UniqueId } from "@application/models/unique-id";
import { AssetVersion } from "@application/models/asset-version";
import { AddItemToPlaylistUseCase } from "./usecases/add-item-to-playlist";
import { ChangeVersionUseCase } from "./usecases/change-version";
import { GetVersionsListUseCase } from "./usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "./usecases/remove-item-from-playlist";
import { ASSET_VERSION_TYPE } from "@application/models/asset-version-type";

@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VersionsListComponent implements OnInit, OnDestroy {
  @Input() currentVersionId: number | null = null;
  public readonly versionTypes = ASSET_VERSION_TYPE;
  public versions$: Observable<never> | Observable<AssetVersion[]> = EMPTY;

  private playlist: AssetVersion[] = [];
  private destroyed$ = new Subject<void>();

  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageStateService: PageStateInterface,
    @Inject(ROUTE_QUERY_STATE_SERVICE_TOKEN)
    private routeQueryStateService: RouteQueryStateInterface,
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

    this.reviewPageStateService.state$
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

  public itemSelectionChanged(selected: boolean, version: AssetVersion) {
    if (selected) {
      this.addItemToPlaylist.execute(version.id);
    } else {
      this.removeItemFromPlaylist.execute(version.id);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
