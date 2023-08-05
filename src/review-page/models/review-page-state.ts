import { Version } from "@application/models/version";

export interface ReviewPageState {
  activeVersionId: number | null;
  playlist: Version[];
}
