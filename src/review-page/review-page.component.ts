import { Component, inject } from "@angular/core";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";
import { Observable } from "rxjs";
import { ReviewPageState } from "@models/review-page-state";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
})
export class ReviewPage {
  state$: Observable<ReviewPageState> = inject(PAGE_STATE_SERVICE_TOKEN).state$;
}



