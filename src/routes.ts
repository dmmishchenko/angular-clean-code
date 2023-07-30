import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "",
    children: [
      {
        path: "review",
        loadChildren: () =>
          import("./review-page/review-page.module").then(
            (m) => m.ReviewPageModule
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
