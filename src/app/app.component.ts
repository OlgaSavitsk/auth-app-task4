import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { AuthPageComponent } from '@auth/pages/auth-page.component';
import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
}

//bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] });
/* bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
  ],
}); */
