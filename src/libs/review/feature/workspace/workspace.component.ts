import { Component, input } from "@angular/core";
import { UniqueId } from "src/libs/shared/util/models/unique-id";
import { MediaAssetComponent } from "../../ui/media-asset/media-asset.component";
import { AssetVersion } from "../../util/models/asset-version";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
  standalone: true,
  imports: [MediaAssetComponent],
})
export class WorkspaceComponent {
  readonly currentVersionId = input.required<UniqueId | null>();
  readonly playlist = input.required<AssetVersion[]>();
}
