import { Component, computed, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { AddItemToPlaylistUseCase } from "@review/data-access/usecases/add-item-to-playlist";
import { GetVersionsListUseCase } from "@review/data-access/usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "@review/data-access/usecases/remove-item-from-playlist";
import { SetActiveVersionUseCase } from "@review/data-access/usecases/set-active-version.usecase";
import { AssetVersion } from "@review/util/models/asset-version";
import { ASSET_VERSION_TYPE } from "@review/util/models/asset-version-type";
import { UniqueId } from "@shared/util/models/unique-id";

@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [FormsModule],
  standalone: true,
})
export class VersionsListComponent {
  private readonly addItemToPlaylist = inject(AddItemToPlaylistUseCase);
  private readonly removeItemFromPlaylist = inject(
    RemoveItemFromPlaylistUseCase
  );
  private readonly changeVersionUseCase = inject(SetActiveVersionUseCase);
  private readonly getVersionsListUseCase = inject(GetVersionsListUseCase);

  readonly currentVersionId = input.required<UniqueId | null>();
  readonly playlist = input.required<AssetVersion[]>();

  protected readonly versionTypes = ASSET_VERSION_TYPE;
  protected versions = toSignal(this.getVersionsListUseCase.execute(), {
    initialValue: [],
  });
  protected readonly playlistIdsSet = computed(
    () => new Set(this.playlist().map((item) => item.id))
  );

  protected changeVersion(id: UniqueId): void {
    this.changeVersionUseCase.execute(id);
  }

  protected itemSelectionChanged(selected: boolean, version: AssetVersion) {
    if (selected) {
      this.addItemToPlaylist.execute(version.id);
    } else {
      this.removeItemFromPlaylist.execute(version.id);
    }
  }
}
