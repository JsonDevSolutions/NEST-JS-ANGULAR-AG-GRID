import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../core/interfaces/product.interface';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  products!: Observable<Product[]>;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe();
    this.products = this.productService.getProducts();
  }
}
