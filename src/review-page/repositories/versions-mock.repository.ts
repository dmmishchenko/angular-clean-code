import { Version } from "../models/version";
import { VERSION_TYPE } from "../models/version-type";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { VersionsRepository } from "../../application/repositories/versions-repository";
import { VersionMessage } from "src/review-page/models/version-message";

const VERSIONS_TABLE = [
  {
    id: 1,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    name: "Blender Video Sintel",
  },
  {
    id: 3,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    name: "First Blender Moovie",
  },
  {
    id: 4,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    name: "Tears of Steel",
  },
  {
    id: 2,
    type: VERSION_TYPE.IMAGE,
    url: "https://picsum.photos/300/200",
    name: "Random Image",
  },
] as Version[];
@Injectable({ providedIn: "root" })
export class VersionsMockRepository implements VersionsRepository {
  getVersionMessages(id: number): Observable<VersionMessage[]> {
    return of([
      {
        author: "Dmitriy",
        text: makeid(20),
      },
      {
        author: "Katya",
        text: makeid(15),
      },
      {
        author: "Alexey",
        text: makeid(10),
      },
    ]);
  }
  getVersionsList(): Observable<Version[]> {
    return of(VERSIONS_TABLE);
  }
  getVersionDetail(id: number): Observable<Version> {
    return of(VERSIONS_TABLE.find((x) => x.id === id)!);
  }
}

function makeid(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}