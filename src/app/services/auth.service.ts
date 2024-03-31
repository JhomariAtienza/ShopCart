import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      catchError((error) => {
        return throwError('Failed to retrieve user data');
      }),
      map((users: User[]) => {
        const user = users.find((u) => u.username === username);
        if (!user) {
          throw new Error('User not found');
        }
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        return user;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  resetPassword(username: string, email: string, mobile: string): Observable<string> {
    // Fetch the user by username, email, and mobile number
    return this.http.get<User[]>(`${this.apiUrl}/users?username=${username}&email=${email}&mobile=${mobile}`).pipe(
      catchError((error) => {
        return throwError('Failed to retrieve user data');
      }),
      switchMap((users: User[]) => {
        const user = users.find((u) => u.username === username && u.email === email && u.mobile === mobile);
        if (!user) {
          return throwError('User not found');
        }
        // Return the user's password
        return of(user.password);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  
}
