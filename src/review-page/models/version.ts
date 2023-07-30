import { UniqueId } from "./unique-id";
import { VERSION_TYPE } from "./version-type";
import { VersionUrl } from "./version-url";

export type Version = {
  id: UniqueId;
  type: VERSION_TYPE;
  url: VersionUrl;
  name: string;
  thumbnail: string;
};
