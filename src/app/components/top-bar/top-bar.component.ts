import { Component } from '@angular/core';

import { CartService } from '../../pages/cart/cart.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  isLogin = false;
  isAdmin = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) {}

  get cartItemsCount(): number {
    return this.cartService.getProductCount();
  }
}
