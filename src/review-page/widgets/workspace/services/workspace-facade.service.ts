import { Injectable } from "@angular/core";
import { MediaAssetsService } from "./media-assets.service";
import { Observable } from "rxjs";

@Injectable()
export class WorkspaceFacadeService {
  constructor(private mediaAssetsService: MediaAssetsService) {}

  public getVideoInstances(): Observable<HTMLVideoElement[]> {
    return this.mediaAssetsService.getVideoAssets$();
  }

  public clearVideoStore(): void {
    this.mediaAssetsService.clearStore();
  }
}
