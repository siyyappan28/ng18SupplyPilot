import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private apiUrl = 'users?page=1'; // Replace with your actual API

  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.apiUrl);
  }
  
  getUserById(id: number): void {
    this.apiService.get<any>(`users/${id}`).subscribe({
      next: (response) => {
        this.setUser(response?.data); // Store logged in user info        
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });;
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  clearUser() {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
