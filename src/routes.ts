import { Route } from '@angular/router';
import { ReviewPage } from './ui/pages/review-page/review-page.component';

export const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'review',
        component: ReviewPage,
      },
      {
        path: '',
        redirectTo: 'review',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'review',
  },
];
