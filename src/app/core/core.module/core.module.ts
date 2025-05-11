import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HttpInterceptorService } from '../interceptors/http.interceptor';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UsersApiService } from '../services/users-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(),    
    ApiService,
    UsersApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
// This module imports the CommonModule and HttpClientModule, and provides the ApiService, AuthService, and HttpInterceptorService.
// The HttpInterceptorService is registered as an HTTP interceptor, allowing it to intercept and modify HTTP requests and responses globally.
// The ApiService and AuthService are also provided, making them available for dependency injection throughout the application.
