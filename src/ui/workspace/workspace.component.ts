import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { GetVersionDetailUseCase } from "src/application/usecases/get-version-detail";
import { Version } from "src/domain/version";
import { VERSION_TYPE } from "src/domain/version-type";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class WorkspaceComponent {
  private _currentVersionId: number | null = null;
  public get currentVersionId(): number | null {
    return this._currentVersionId;
  }
  @Input()
  public set currentVersionId(value: number | null) {
    this._currentVersionId = value;
    if (value) {
      this.version$ = this.getVersion.execute(value);
    } else {
      this.version$ = null;
    }
  }
  public version$: Observable<Version> | null = null;
  public readonly versionTypes = VERSION_TYPE;

  constructor(private getVersion: GetVersionDetailUseCase) {}
}
