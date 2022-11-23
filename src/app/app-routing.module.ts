import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from '@auth/pages/auth-page.component';
import { Path } from './app.constants';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: Path.loginPage, pathMatch: 'full' },
  {
    path: Path.loginPage,
    loadChildren: () => import('./auth/auth-routing.module').then((routes) => routes.lazyroutes),
  },
  {
    /*  path: Path.adminPage,
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard], */
  },
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
