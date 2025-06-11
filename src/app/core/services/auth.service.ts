import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersApiService } from './users-api.service' ; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private baseUrl = 'https://reqres.in/api'; // Replace with your API base URL
  constructor(private http: HttpClient, private router: Router, private userAPIService: UsersApiService) { }  

  // Login method
  login(username: string, password: string): void {
    this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password }, {
      headers: { 'x-api-key': 'reqres-free-v1' }
    })
    .subscribe({
      next: (response) => {
        localStorage.setItem(this.tokenKey, response.token); // Store token
        this.userAPIService.getUserById(2); // Fetch user data
        this.router.navigate(['/dashboard']); // Navigate to home on successful login
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token
    this.router.navigate(['/login']); // Navigate to login page
  }

  // Get token method
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken(); // Check if token exists
  }

  // Register method
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/register`, body, {
      headers: { 'x-api-key': 'reqres-free-v1' }
    });
  }
}
