import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://reqres.in/api'; // Replace with your API base URL
  private defaultHeaders = new HttpHeaders({ 'x-api-key': 'reqres-free-v1' });

  constructor(private http: HttpClient) { }

  // Generic GET method
  get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const combinedHeaders = headers ? headers.set('x-api-key', 'reqres-free-v1') : this.defaultHeaders;
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers: combinedHeaders })
      .pipe(catchError(this.handleError));
  }

  // Generic POST method
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const combinedHeaders = headers ? headers.set('x-api-key', 'reqres-free-v1') : this.defaultHeaders;
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: combinedHeaders })
      .pipe(catchError(this.handleError));
  }

  // Generic PUT method
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const combinedHeaders = headers ? headers.set('x-api-key', 'reqres-free-v1') : this.defaultHeaders;
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers: combinedHeaders })
      .pipe(catchError(this.handleError));
  }

  // Generic DELETE method
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const combinedHeaders = headers ? headers.set('x-api-key', 'reqres-free-v1') : this.defaultHeaders;
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: combinedHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error); // Log the error for debugging
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
