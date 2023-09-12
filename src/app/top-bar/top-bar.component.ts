import { Component } from '@angular/core';

import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private cartService: CartService) {}

  get cartItemsCount(): number {
    return this.cartService.getProductCount();
  }
}
