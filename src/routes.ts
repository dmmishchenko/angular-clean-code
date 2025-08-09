import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "",
    children: [
      {
        path: "review",
        loadComponent: () =>
          import("./pages/review-page/review-page.component").then(
            (m) => m.ReviewPage
          ),
      },
      {
        path: "",
        redirectTo: "review",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "review",
  },
];
