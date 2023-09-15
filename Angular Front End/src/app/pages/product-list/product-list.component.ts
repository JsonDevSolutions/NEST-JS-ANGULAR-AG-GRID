import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../core/interfaces/products';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products!: Observable<Product[]>;

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
