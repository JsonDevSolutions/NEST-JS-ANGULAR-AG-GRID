import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product } from '../../core/interfaces/products';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  products!: Observable<Product[]>;

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
