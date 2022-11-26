import { AdminComponent } from '@admin/admin.component';
import { inject } from '@angular/core';
import { Route, Router, Routes, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { map } from 'rxjs';

import { Path } from './app.constants';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: Path.signupPage, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.authroutes),
  },
  {
    path: Path.adminPage,
    loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
    canLoad: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).isLoggedIn$$.pipe(
          map((isLogged) => isLogged || router.createUrlTree([Path.loginPage]))
        );
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
