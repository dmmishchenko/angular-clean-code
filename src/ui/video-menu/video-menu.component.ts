import { Component, EventEmitter, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { GetStateUseCase } from "src/application/usecases/get-state";
import { Version } from "src/domain/version";
import { VERSION_TYPE } from "src/domain/version-type";

@Component({
  selector: "video-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
})
export class VideoMenuComponent {
  @Output() changeActiveVideo = new EventEmitter<number>();
  public playlist$ = inject(GetStateUseCase)
    .execute()
    .pipe(map((state) => state.playlist));

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }

  public showSlider(playlist: Version[]): boolean {
    return (
      playlist.length > 1 ||
      (!!playlist.length && playlist[0].type === VERSION_TYPE.VIDEO)
    );
  }
  public changeVideo(versionId: number) {
    this.changeActiveVideo.emit(versionId);
  }
}
