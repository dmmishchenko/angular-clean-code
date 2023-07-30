import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReviewPage } from "./review-page.component";

const routes: Routes = [
  {
    path: "",
    component: ReviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewPageRoutingModule {}
