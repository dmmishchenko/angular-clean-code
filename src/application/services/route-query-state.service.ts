import { VERSION_ID } from "src/environments/consts";

export type QueryStateChanges = {
  [key in keyof QueryState]?: QueryState[key];
};

export interface QueryState {
  [VERSION_ID]: number | null;
}

export interface RouteQueryStateInterface {
  changeState(changes: QueryStateChanges): void;
}
