import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host = 'http://localhost:3333';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any) {
    return this.http.post(`${this.host}/auth/register`, user);
  }

  login(userData: any) {
    return this.http.post(`${this.host}/auth/login`, userData).pipe(
      map((user: ApiResponse<Response>) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user.data));
        }
        return user;
      }),
    );
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (!!user && JSON.parse(user).isAdmin) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
