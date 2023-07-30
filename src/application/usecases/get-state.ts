import { Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateService } from "@data/services/review-page-state.service";
import { ReviewPageState } from "@domain/review-page-state";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class GetStateUseCase
  implements Usecase<Observable<ReviewPageState>>
{
  constructor(private reviewPageState: ReviewPageStateService) { }
  execute(): Observable<ReviewPageState> {
    return this.reviewPageState.state$;
  }
}
