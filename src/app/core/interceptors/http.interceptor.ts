import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token to the request if available
    const token = this.authService.getToken();
    const modifiedReq = token ? req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) : req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Request:', modifiedReq); // Log the request for audit

    return next.handle(modifiedReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Response:', event); // Log the response for audit
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.error('Error:', error); // Log the error for audit

            // Handle specific HTTP status codes
            switch (error.status) {
              case 401: // Unauthorized
                this.authService.logout(); // Logout user
                break;
              case 403: // Forbidden
                this.router.navigate(['/error-info'], { queryParams: { message: 'Access Denied' } });
                break;
              case 404: // Not Found
                this.router.navigate(['/error-info'], { queryParams: { message: 'Resource Not Found' } });
                break;
              case 500: // Internal Server Error
                this.router.navigate(['/error-info'], { queryParams: { message: 'Server Error' } });
                break;
              default:
                if (error.status >= 400 && error.status < 500) {
                  this.router.navigate(['/error-info'], { queryParams: { message: 'Client Error' } });
                } else if (error.status >= 500) {
                  this.router.navigate(['/error-info'], { queryParams: { message: 'Server Error' } });
                }
                break;
            }
          }
        }
      )
    );
  }
}
