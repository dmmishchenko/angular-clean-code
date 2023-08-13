import { Observable } from "rxjs";
import { VERSION_ID } from "src/environments/consts";
import { ReviewQueryStateDecorator } from "src/review-page/services/review-query-state.decorator";

export type QueryStateChanges = {
  [key in keyof QueryState]?: QueryState[key];
};

export interface QueryState {
  [VERSION_ID]: number | null | string;
}

export interface RouteQueryStateInterface {
  changeState(changes: QueryStateChanges): void;

  getState(): Observable<ReviewQueryStateDecorator>;
  
  getVersionIdFromRoute(): Observable<string | number | null>;
}
