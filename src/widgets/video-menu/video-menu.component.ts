import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { GET_STATE_USE_CASE } from "@application/tokens";
import {
  Subject,
  distinctUntilChanged,
  map,
  takeUntil
} from "rxjs";
import { Version } from "src/review-page/models/version";
import { VERSION_TYPE } from "src/review-page/models/version-type";
import { WorkspaceFacadeService } from "../workspace/workspace-widget.module";
import { ChangeActiveVersionUseCase } from "./usecases/change-active-version";

@Component({
  selector: "video-menu",
  templateUrl: "./video-menu.component.html",
  styleUrls: ["./video-menu.component.scss"],
})
export class VideoMenuComponent implements OnInit, OnDestroy {
  @Input() currentVersionId: number | null = null;
  private destroyed$ = new Subject<void>();

  public videoPlaylist$ = inject(GET_STATE_USE_CASE)
    .execute()
    .pipe(
      map((state) =>
        state.playlist.filter((item) => item.type === VERSION_TYPE.VIDEO)
      ),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      takeUntil(this.destroyed$)
    );

  constructor(
    private changeActiveVersionUseCase: ChangeActiveVersionUseCase,
    private workspaceFacade: WorkspaceFacadeService
  ) {}

  ngOnInit(): void {
    // need to wait when all video assets are loaded and enable their sliders
  }

  public trackByFunc(_: number, item: Version) {
    return item.id;
  }

  public changeVideo(versionId: number) {
    this.changeActiveVersionUseCase.execute(versionId);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
