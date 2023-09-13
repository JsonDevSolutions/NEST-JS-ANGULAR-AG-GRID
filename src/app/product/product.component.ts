import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './products';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'description' },
    { field: 'price' },
    { field: 'Action' },
  ];

  rowData!: Observable<Product[]>;

  defaultColDef: ColDef = {
    sortable: true,
  };

  ngOnInit(): void {
    this.rowData = this.productService.getProducts();
  }
}
