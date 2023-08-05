import { Inject, Injectable } from "@angular/core";
import { Usecase } from "@application/base/use-case";
import { ReviewPageStateService } from "src/review-page/services/review-page-state.service";
import { ReviewPageState } from "src/review-page/models/review-page-state";
import { Observable } from "rxjs";
import { PAGE_STATE_SERVICE } from "@application/tokens";

@Injectable()
export class GetStateUseCase implements Usecase<Observable<ReviewPageState>> {
  constructor(
    @Inject(PAGE_STATE_SERVICE) private reviewPageState: ReviewPageStateService
  ) {}
  execute(): Observable<ReviewPageState> {
    return this.reviewPageState.state$;
  }
}
