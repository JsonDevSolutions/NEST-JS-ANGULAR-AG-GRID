import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../../pages/product/products';
import { User } from '../interfaces/user.interface';

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
      map((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
        return user;
      }),
    );
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('currentUser');
  }
}
