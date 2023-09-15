import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api.interface';
import { HttpConfigService } from './http-config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private httpConfigService: HttpConfigService,
  ) {}

  host = this.httpConfigService.getHost();

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
