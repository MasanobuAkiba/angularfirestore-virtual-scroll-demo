import { Routes, RouterModule } from '@angular/router';

import { ArticleListComponent } from 'app/pages/article-list/article-list.component';
import { ArticleDetailComponent } from 'app/pages/article-detail/article-detail.component';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'article/list' },
    { path: 'article/list', component: ArticleListComponent, data: { shouldDetach: true } },
    { path: 'article/:articleId', component: ArticleDetailComponent },
];

export const AppRoutes = appRoutes;

export const PageComponents = [
    ArticleListComponent,
    ArticleDetailComponent,
];
