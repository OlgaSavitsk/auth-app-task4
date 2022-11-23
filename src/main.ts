import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter, RouterModule } from '@angular/router';
import { authroutes } from '@auth/auth-routing.module';
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { AppModule } from './app/app.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule),
    provideRouter(appRoutes),
    //importProvidersFrom(RouterModule.forRoot(authroutes)),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     //importProvidersFrom(RouterModule.forRoot(routes)),
//     provideHttpClient(),
//     //importProvidersFrom(HttpClientModule),
//     provideRouter(routes),
//     //importProvidersFrom(AppModule),
//     //importProvidersFrom(AuthModule),
//     //importProvidersFrom(CoreModule),
//     //importProvidersFrom(SharedModule),
//   ],
// });
