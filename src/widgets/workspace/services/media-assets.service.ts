import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MediaAssetsService {
  private videoAssets: HTMLVideoElement[] = [];
  private readonly videoAssets$$ = new BehaviorSubject<HTMLVideoElement[]>([]);

  public getVideoAssets$() {
    return this.videoAssets$$.asObservable();
  }

  // not sure about this approach
  public setAsset(video: HTMLVideoElement) {
    this.videoAssets.push(video);
    this.videoAssets$$.next(this.videoAssets);
  }

  public clearStore() {
    this.videoAssets = [];
    // this.videoAssets$$.next(this.videoAssets);
  }
}
