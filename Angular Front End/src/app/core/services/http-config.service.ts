import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  private host = 'http://localhost:3333';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.getAccessToken()}`);

  getHost() {
    return this.host;
  }

  getHeaders() {
    return this.headers;
  }

  getAccessToken() {
    const userData = localStorage.getItem('user');
    if (!!userData) {
      const user = JSON.parse(userData);
      return user.access_token;
    }
  }
}
