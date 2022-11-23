import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { authroutes } from '@auth/auth-routing.module';

//import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TOKEN_INTERCEPTOR_PROVIDERS } from './core/interceptors/providers';

@NgModule({
  declarations: [],
  imports: [
    //CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    //AppRoutingModule,
    // HttpClientModule,
    //CoreModule,
    //SharedModule,
    //RouterModule.forChild(routes),
  ],
  //providers: [TOKEN_INTERCEPTOR_PROVIDERS],
  bootstrap: [],
})
export class AppModule {}
