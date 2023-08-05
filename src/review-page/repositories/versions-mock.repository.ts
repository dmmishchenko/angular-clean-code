import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { VersionMessage } from "@application/models/version-message";
import { VersionsRepository } from "../../application/repositories/versions-repository";
import { ItemNotFoundError } from "../errors/item-not-found";
import { VERSION_TYPE } from "@application/models/version-type";
import { Version } from "@application/models/version";

const VERSIONS_TABLE = [
  {
    id: 1,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    name: "Blender Video Sintel",
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
  },
  {
    id: 3,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    name: "First Blender Moovie",
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
  },
  {
    id: 4,
    type: VERSION_TYPE.VIDEO,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    name: "Tears of Steel",
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  },
  {
    id: 2,
    type: VERSION_TYPE.IMAGE,
    url: "https://picsum.photos/300/200",
    name: "Random Image",
    thumbnail: "assets/default_thumbnail.png",
  },
] as Version[];
@Injectable()
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
  /**
   * execute versions load from repository
   * @param id - this field is used to simulate pagination load
   * @returns
   */
  getVersionsList(id?: number): Observable<Version[]> {
    return of(VERSIONS_TABLE).pipe(delay(100));
  }
  getVersionDetail(id: number): Observable<Version> {
    const itemInDb = VERSIONS_TABLE.find((x) => x.id === id);
    if (itemInDb) {
      return of(itemInDb).pipe(delay(100));
    }
    return throwError(() => {
      const error = new ItemNotFoundError(
        `Item with version id :${id} doesn't exist`
      );
      return error;
    });
  }
}

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
