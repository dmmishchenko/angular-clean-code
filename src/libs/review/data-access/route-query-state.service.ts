import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  QueryStateChanges,
  RouteQueryStateInterface,
} from "../util/interfaces/route-query-state.interface";
import { Observable, map } from "rxjs";
import { ReviewQueryStateDecorator } from "./review-query-state.decorator";
import { VERSION_ID } from "src/environments/consts";

@Injectable()
export class RouteQueryStateService implements RouteQueryStateInterface {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

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

  public getVersionIdFromRoute(): Observable<string | number | null> {
    const versionId$ = this.activatedRoute.queryParamMap.pipe(
      map((paramPam) => {
        return new ReviewQueryStateDecorator(paramPam).get(VERSION_ID);
      })
    );
    return versionId$;
  }
}
