import { Component, Signal, computed, inject } from "@angular/core";
import { PageState } from "@application/models/page-state";
import { PAGE_STATE_SERVICE_TOKEN } from "@application/tokens";

@Component({
  selector: "review-page",
  templateUrl: "./review-page.component.html",
  styleUrls: ["./review-page.component.scss"],
})
export class ReviewPage {
  state$: Signal<PageState> = inject(PAGE_STATE_SERVICE_TOKEN).state$;
  activeVersionId$: Signal<number | null> = computed(
    () => this.state$().activeVersionId
  );
}
