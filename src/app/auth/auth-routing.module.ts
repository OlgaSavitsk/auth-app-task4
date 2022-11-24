import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'rxjs';

import { Path } from '../app.constants';
import { SigninComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';

export const authroutes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: Path.signupPage, component: SignupComponent },
      { path: Path.loginPage, component: SigninComponent },
    ],
  },
];
