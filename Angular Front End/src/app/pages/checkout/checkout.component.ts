import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { Cart } from 'src/app/core/interfaces/cart.interface';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {}
  items!: Observable<Cart[]>;
  totalAmount: number = 0;
  cartCount = this.cartService.getCartItemsCount();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    contact_number: '',
  });

  calculateTotalAmount() {
    this.items.subscribe((items) => {
      this.totalAmount = items.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0,
      );
    });
  }

  onCheckout(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
    this.calculateTotalAmount();
  }
}
