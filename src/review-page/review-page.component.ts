import { Component, inject } from "@angular/core";
import { GET_STATE_USE_CASE_TOKEN } from "@application/tokens";
import { Observable } from "rxjs";
import { ReviewPageState } from "src/review-page/models/review-page-state";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
})
export class ReviewPage {
  state$: Observable<ReviewPageState> = inject(GET_STATE_USE_CASE_TOKEN).execute();
}



