import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/products';
import { CartService } from 'src/app/pages/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  quantity = 1;
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  onQuantityUpdate(event: Event) {
    const quantityInput = event.target as HTMLInputElement;
    this.quantity = Number(quantityInput.value);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(Number(product.id), this.quantity).subscribe({
      complete: () => {
        this.quantity = 1;
        this.cartService.getCartItems().subscribe();
      },
    });
  }
}
