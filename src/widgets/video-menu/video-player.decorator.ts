import { Observable, from } from "rxjs";

export class VideoPlayerDecorator {
  private video: HTMLVideoElement;
  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  getTime() {
    return this.video.currentTime;
  }

  setTime(time: number) {
    this.video.currentTime = time;
  }

  play(): Observable<boolean> {
    return from(
      this.video
        .play()
        .then(() => true)
        .catch(() => false)
    );
  }
}
