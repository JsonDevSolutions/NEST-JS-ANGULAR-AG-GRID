import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../core/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  host = 'http://localhost:3333';

  items: Product[] = [];

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.host}/cart`, {
      userId: 1,
      productId,
      quantity,
    });
  }

  getItems() {
    return this.items;
  }

  getProductCount() {
    return this.items.length;
  }

  deleteItem(product: Product) {
    const index: number = this.items.indexOf(product);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
