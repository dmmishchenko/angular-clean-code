import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VersionsListComponent } from "./versions-list.component";
import { AddItemToPlaylistUseCase } from "./usecases/add-item-to-playlist";
import { ChangeVersionUseCase } from "./usecases/change-version";
import { GetVersionsListUseCase } from "./usecases/get-versions-list";
import { RemoveItemFromPlaylistUseCase } from "./usecases/remove-item-from-playlist";

@NgModule({
  declarations: [],
  imports: [CommonModule, VersionsListComponent],
  exports: [VersionsListComponent],
  providers: [
    AddItemToPlaylistUseCase,
    ChangeVersionUseCase,
    GetVersionsListUseCase,
    RemoveItemFromPlaylistUseCase,
  ],
})
export class VersionsListWidgetModule {}
