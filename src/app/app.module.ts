import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { UserEffects } from './redux/effects';
import { reducer } from './redux/reducers';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    StoreModule.forRoot({}),
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UserEffects]),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
