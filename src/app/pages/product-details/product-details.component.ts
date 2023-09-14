import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../core/interfaces/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    // Get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));

    this.productService.getProductById(productId).subscribe((data: Product) => {
      this.product = data;
    });
  }
}
