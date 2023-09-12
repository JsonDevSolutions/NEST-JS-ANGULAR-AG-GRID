import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product/products';
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

  // products = [...products];
  products!: Observable<Product[]>;

  @Output() valueChanged = new EventEmitter<Product>();

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.valueChanged.emit(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
