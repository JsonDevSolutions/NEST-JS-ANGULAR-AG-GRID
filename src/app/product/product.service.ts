import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  host = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.host}/product`);
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.host}/product/${productId}`);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.host}/product/${productId}`);
  }
}
