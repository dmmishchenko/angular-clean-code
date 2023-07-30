import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  QueryStateChanges,
  RouteQueryStateInterface,
} from "@application/services/route-query-state.service";
import { Observable, map } from "rxjs";
import { ReviewQueryStateDecorator } from "./review-query-state.decorator";

@Injectable()
export class RouteQueryStateService implements RouteQueryStateInterface {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public changeState(changes: QueryStateChanges): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: changes,
    });
  }

  public getState(): Observable<ReviewQueryStateDecorator> {
    return this.activatedRoute.queryParamMap.pipe(
      map((paramPam) => {
        return new ReviewQueryStateDecorator(paramPam);
      })
    );
  }
}
