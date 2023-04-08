import { Injectable } from "@angular/core";
import { Usecase } from "../base/use-case";
import { ReviewPageStateService } from "src/data/services/review-page-state.service";
import { Observable } from "rxjs";
import { ReviewPageState } from "src/domain/review-page-state";

@Injectable({ providedIn: "root" })
export class GetStateUseCase
  implements Usecase<Observable<ReviewPageState>>
{
  constructor(private reviewPageState: ReviewPageStateService) {}
  execute(): Observable<ReviewPageState> {
    return this.reviewPageState.state$;
  }
}
