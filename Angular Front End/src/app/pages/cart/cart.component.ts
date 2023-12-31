import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from './cart.service';
import { Product } from '../../core/interfaces/product.interface';
import { Cart } from 'src/app/core/interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  items!: Observable<Cart[]>;

  deleteCartItem(product: Product) {
    this.cartService.deleteItem(Number(product.id)).subscribe({
      complete: () => (this.items = this.cartService.getCartItems()),
    });
  }

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
  }
}
