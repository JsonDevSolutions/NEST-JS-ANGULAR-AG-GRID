import { Component, OnInit } from '@angular/core';

import { CartService } from '../../pages/cart/cart.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) {}

  get cartItemsCount(): number {
    return this.cartService.getCartItemsCount();
  }

  isLogin() {
    return this.userService.isAuthenticated();
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  logOut() {
    this.userService.logOut();
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe();
  }
}
