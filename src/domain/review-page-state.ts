import { Version } from "./version";

export interface ReviewPageState {
  activeVersionId: number | null;
  playlist: Version[];
}
