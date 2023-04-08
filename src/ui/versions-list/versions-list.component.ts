import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { UniqueId } from "../../domain/unique-id";
import { GetVersionsListUseCase } from "../../application/usecases/get-versions-list";

@Component({
  selector: "versions-list",
  templateUrl: "./versions-list.component.html",
  styleUrls: ["./versions-list.component.scss"],
  imports: [CommonModule],
  standalone: true,
})
export class VersionsListComponent {
  @Output() versionChanged = new EventEmitter<number>();
  @Input() currentVersionId: number | null = null;

  versions$ = inject(GetVersionsListUseCase).execute();

  selectVersion(id: UniqueId): void {
    this.versionChanged.emit(id);
  }
}
