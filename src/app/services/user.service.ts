import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users';
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId():number | null {
    return this.userId;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  getUserByuserName(userName: string): Observable<User> {
    const url = `${this.usersUrl}?username=${userName}`;
    return this.http.get<any>(url)
  }

}
