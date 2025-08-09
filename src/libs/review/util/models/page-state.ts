import { AssetVersion } from "./asset-version";

export interface PageState {
  activeVersionId: number | null;
  playlist: AssetVersion[];
}
