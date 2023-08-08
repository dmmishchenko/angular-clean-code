import { Component, OnInit, inject } from "@angular/core";
import { AssetVersion } from "@application/models/asset-version";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { map } from "rxjs";
import { MediaAssetsService } from "./services/media-assets.service";

@Component({
  selector: "workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent implements OnInit {
  public playlist$ = inject(PAGE_STATE_SERVICE_TOKEN).state$.pipe(
    map((state) => state.playlist)
  );

  constructor(private mediaAssetsService: MediaAssetsService) {}

  ngOnInit(): void {
    this.mediaAssetsService.initialize(this.playlist$);
  }

  public trackByFunc(_: number, item: AssetVersion) {
    return item.id;
  }
}
