import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import  { routes } from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth.interceptor";
import { ToastService, AngularToastifyModule } from "angular-toastify";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    ToastService
  ]
};
