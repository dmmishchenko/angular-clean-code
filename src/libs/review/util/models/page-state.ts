import { AssetVersion } from "src/libs/review/util/models/asset-version";

export interface PageState {
  activeVersionId: number | null;
  playlist: AssetVersion[];
}
