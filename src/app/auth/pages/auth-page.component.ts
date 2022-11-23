import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiginComponent } from '@auth/components/login/login.component';
import { SignupComponent } from '@auth/components/signup/signup.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, SiginComponent, SignupComponent],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {}
