import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { GetVersionMessagesUseCase } from "src/application/usecases/get-version-messages";
import { VersionMessage } from "src/domain/version-message";

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

  constructor(private getVersionMessagesUseCase: GetVersionMessagesUseCase) {}
}
