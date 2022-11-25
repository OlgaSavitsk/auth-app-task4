import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from '@auth/pages/auth-page.component';
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
    //canLoad: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
