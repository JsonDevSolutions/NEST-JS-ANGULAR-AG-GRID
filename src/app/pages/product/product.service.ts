import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../core/interfaces/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  host = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  addProduct(product: any) {
    return this.http.post(`${this.host}/product`, product);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.host}/product`);
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.host}/product/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.host}/product/${product.id}`, product);
  }

  updateProductStatus(productId: number, published: boolean) {
    return this.http.put(`${this.host}/product/status/${productId}`, {
      published,
    });
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.host}/product/${productId}`);
  }
}
