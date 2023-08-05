import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MediaAssetComponent } from "./components/media-asset/media-asset.component";
import { MediaAssetsService } from "./services/media-assets.service";
import { WorkspaceFacadeService } from "./services/workspace-facade.service";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
  imports: [CommonModule],
  declarations: [WorkspaceComponent, MediaAssetComponent],
  exports: [WorkspaceComponent],
  providers: [WorkspaceFacadeService, MediaAssetsService],
})
export class WorkspaceWidgetModule {}

export { WorkspaceFacadeService } from "./services/workspace-facade.service";
