import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { UniqueId } from "../../domain/unique-id";
import { GetVersionsListUseCase } from "../../application/usecases/get-versions-list";
import { FormsModule } from "@angular/forms";
import { VERSION_TYPE } from "src/domain/version-type";
import { Version } from "src/domain/version";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { AddItemToPlaylist } from "src/application/usecases/add-item-to-playlist";
import { RemoveItemFromPlaylist } from "src/application/usecases/remove-item-from-playlist";

@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VersionsListComponent implements OnInit {
  @Output() versionChanged = new EventEmitter<number>();
  @Input() currentVersionId: number | null = null;
  public readonly versionTypes = VERSION_TYPE;
  versions$ = inject(GetVersionsListUseCase).execute();

  private playlist: Version[] = [];

  constructor(
    private getState: GetStateUseCase,
    private addItemToPlaylist: AddItemToPlaylist,
    private removeItemFromPlaylist: RemoveItemFromPlaylist
  ) {}

  ngOnInit(): void {
    this.getState
      .execute()
      .subscribe((state) => {
        this.playlist = state.playlist
      });
  }

  // one approach when we emit event to page and page decides what to do next
  public changeVersion(id: UniqueId): void {
    this.versionChanged.emit(id);
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
