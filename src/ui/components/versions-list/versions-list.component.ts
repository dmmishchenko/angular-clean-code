import { CommonModule } from "@angular/common";
import {
  Component, inject, Input,
  OnInit
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UniqueId } from "@domain/unique-id";
import { Version } from "@domain/version";
import { VERSION_TYPE } from "@domain/version-type";
import { GetStateUseCase } from "@usecases/get-state";
import { AddItemToPlaylistUseCase } from "@usecases/versions-list/add-item-to-playlist";
import { ChangeVersionUseCase } from "@usecases/versions-list/change-version";
import { GetVersionsListUseCase } from "@usecases/versions-list/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "@usecases/versions-list/remove-item-from-playlist";

@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VersionsListComponent implements OnInit {
  @Input() currentVersionId: number | null = null;
  public readonly versionTypes = VERSION_TYPE;
  versions$ = inject(GetVersionsListUseCase).execute();

  private playlist: Version[] = [];

  constructor(
    private getState: GetStateUseCase,
    private addItemToPlaylist: AddItemToPlaylistUseCase,
    private removeItemFromPlaylist: RemoveItemFromPlaylistUseCase,
    private changeVersionUseCase: ChangeVersionUseCase,
  ) { }

  ngOnInit(): void {
    this.getState
      .execute()
      .subscribe((state) => {
        this.playlist = state.playlist
      });
  }

  // one approach when we emit event to page and page decides what to do next
  public changeVersion(id: UniqueId): void {
    this.changeVersionUseCase.execute(id);
  }

  public isInPlaylist(versionId: number): boolean {
    return (
      this.playlist.length > 1 &&
      this.playlist.some((item) => item.id === versionId)
    );
  }

  // another approach when we call usecase from child component and not from page component
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
}
