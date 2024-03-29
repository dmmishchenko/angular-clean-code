import { ParamMap } from "@angular/router";
import { QueryState } from "@application/services/route-query-state.service";

export class ReviewQueryStateDecorator {
  private paramMap: ParamMap;
  constructor(paramMap: ParamMap) {
    this.paramMap = paramMap;
  }

  get(key: keyof QueryState): QueryState[typeof key] {
    return this.paramMap.get(key);
  }
}