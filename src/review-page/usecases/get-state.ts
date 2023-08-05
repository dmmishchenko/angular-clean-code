import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateInterface } from "@application/services/review-page-state.interface";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { Observable } from "rxjs";
import { ReviewPageState } from "src/review-page/models/review-page-state";

@Injectable()
export class GetStateUseCase implements Usecase<Observable<ReviewPageState>> {
  constructor(
    @Inject(PAGE_STATE_SERVICE_TOKEN)
    private reviewPageState: ReviewPageStateInterface
  ) {}
  execute(): Observable<ReviewPageState> {
    return this.reviewPageState.state$;
  }
}
