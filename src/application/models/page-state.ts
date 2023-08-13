import { AssetVersion } from "@application/models/asset-version";

export interface PageState {
  activeVersionId: number | null;
  playlist: AssetVersion[];
}
