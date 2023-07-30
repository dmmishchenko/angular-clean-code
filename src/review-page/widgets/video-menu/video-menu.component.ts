import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { map } from "rxjs";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";

@Component({
  selector: "video-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
})
export class VideoMenuComponent {
  public playlist$ = inject(GetStateUseCase)
    .execute()
    .pipe(map((state) => state.playlist));

  constructor(private changeActiveVersionUseCase: ChangeActiveVersionUseCase) { }

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
    this.changeActiveVersionUseCase.execute(versionId);
  }
}
