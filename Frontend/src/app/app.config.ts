import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './shared/auth.interceptor';
import { DataService } from './shared/data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DataService,
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
