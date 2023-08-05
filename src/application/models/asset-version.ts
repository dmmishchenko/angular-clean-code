import { UniqueId } from "./unique-id";
import { ASSET_VERSION_TYPE } from "./asset-version-type";
import { VersionUrl } from "./version-url";

export type AssetVersion = {
  id: UniqueId;
  type: ASSET_VERSION_TYPE;
  url: VersionUrl;
  name: string;
  thumbnail: string;
};
