import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart.interface';
import { HttpConfigService } from 'src/app/core/services/http-config.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Cart[] = [];

  constructor(
    private http: HttpClient,
    private httpConfigService: HttpConfigService,
    private userService: UserService,
  ) {}

  host = this.httpConfigService.getHost();

  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.host}/cart`, {
      userId: this.userService.getUserId(),
      productId,
      quantity,
    });
  }

  getCartItems() {
    return this.http
      .get<Cart[]>(`${this.host}/cart/${this.userService.getUserId()}`)
      .pipe(
        map((product) => {
          if (product) {
            this.items = product;
          }
          return product;
        }),
      );
  }

  getCartItemsCount() {
    return this.items.length;
  }

  deleteItem(productId: number) {
    return this.http.delete(
      `${this.host}/cart/${this.userService.getUserId()}/${productId}`,
    );
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
