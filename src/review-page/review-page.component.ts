import { Component, inject } from "@angular/core";
import { ReviewPageState } from "src/review-page/models/review-page-state";
import { GetStateUseCase } from "src/review-page/usecases/get-state";
import { Observable } from "rxjs";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
})
export class ReviewPage {
  state$: Observable<ReviewPageState> = inject(GetStateUseCase).execute();
}



