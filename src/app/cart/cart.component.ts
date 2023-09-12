import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../product/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  items = this.cartService.getItems();

  deleteCartItem(product: Product) {
    this.cartService.deleteItem(product);
  }
}
