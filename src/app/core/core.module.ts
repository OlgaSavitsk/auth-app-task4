import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import FooterComponent from './components/footer/footer.component';
import LoginComponent from './components/header/login/login.component';
import HeaderComponent from './components/header/header.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  exports: [],
})
export class CoreModule {}
