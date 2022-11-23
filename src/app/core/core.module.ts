import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import FooterComponent from './components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent, PageNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [FooterComponent],
})
export class CoreModule {}
