import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
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
  @Input() activeVersion: Version | null = null;
  public readonly versionTypes = VERSION_TYPE;
}
