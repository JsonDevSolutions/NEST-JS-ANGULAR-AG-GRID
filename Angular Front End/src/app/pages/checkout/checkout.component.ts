import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { Product } from 'src/app/core/interfaces/products';
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
  items!: Observable<Product[]>;
  cartCount = this.cartService.getProductCount();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    contact_number: '',
  });

  onCheckout(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
  }
}
