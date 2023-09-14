import { Injectable } from '@angular/core';

import { Product } from '../../core/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];

  constructor() {}

  addToCart(product: Product) {
    this.items.push(product);
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
