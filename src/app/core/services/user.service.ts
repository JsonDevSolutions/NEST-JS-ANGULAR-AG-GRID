import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../pages/product/products';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host = 'http://localhost:3333';
  isLogin = false;

  constructor(private http: HttpClient) {}

  signUp(user: any) {
    return this.http.post(`${this.host}/auth/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.host}/auth/login`, user);
  }
}
