import {
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { UniqueId } from "src/libs/shared/util/models/unique-id";
import { AssetVersion } from "../../util/models/asset-version";
import { JoinSessionUseCase } from "./usecases/join-session";
import { LeaveSessionUseCase } from "./usecases/leave-session";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  standalone: true,
})
export class HeaderMenuComponent implements OnDestroy {
  private joinSessionUseCase = inject(JoinSessionUseCase);
  private leadeSessionUseCase = inject(LeaveSessionUseCase);

  readonly activeVersionId = input.required<UniqueId | null>();
  readonly playlist = input.required<AssetVersion[]>();

  public readonly activeVersionName = computed(() => {
    const activeVersionId = this.activeVersionId();
    const playlist = this.playlist();
    const activeVersion = playlist.find((item) => item.id === activeVersionId);
    return activeVersion?.name || null;
  });
  public isInSync = signal(false);

  protected joinSync() {
    try {
      this.joinSessionUseCase.execute();
      this.isInSync.set(true);
    } catch (error) {
      console.error(error);
    }
  }

  protected leaveSync() {
    this.leadeSessionUseCase.execute();
    this.isInSync.set(false);
  }

  ngOnDestroy(): void {
    this.leaveSync();
  }
}
