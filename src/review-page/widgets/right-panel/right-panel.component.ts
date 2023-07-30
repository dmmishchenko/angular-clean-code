import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { VersionMessage } from "src/review-page/models/version-message";
import { GetVersionMessagesUseCase } from "src/review-page/widgets/right-panel/usecases/get-version-messages";
import { Observable } from "rxjs";


@Component({
  selector: "right-panel",
  templateUrl: "./right-panel.component.html",
  styleUrls: ["./right-panel.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class RightPanelComponent {
  private _currentVersionId: number | null = null;
  public get currentVersionId(): number | null {
    return this._currentVersionId;
  }
  @Input()
  public set currentVersionId(value: number | null) {
    this._currentVersionId = value;
    if (value) {
      this.messages$ = this.getVersionMessagesUseCase.execute(value);
    } else {
      this.messages$ = null;
    }
  }
  public messages$: Observable<VersionMessage[]> | null = null;

  constructor(private getVersionMessagesUseCase: GetVersionMessagesUseCase) { }
}
