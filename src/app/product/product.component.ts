import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './products';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { EditDeleteButtonComponent } from '../edit-delete-button/edit-delete-button.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {}

  rowData!: Observable<Product[]>;
  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'description' },
    { field: 'price', editable: true },
    { field: 'Action', cellRenderer: EditDeleteButtonComponent },
  ];

  defaultColDef: ColDef = {
    sortable: true,
  };

  addProductForm = this.formBuilder.group({
    name: '',
    description: '',
    price: 0,
    published: true,
  } as Product);

  onAddProduct(): void {
    this.productService.addProduct(this.addProductForm.value).subscribe();
    this.addProductForm.reset();
  }

  ngOnInit(): void {
    this.rowData = this.productService.getProducts();
  }

  onCellClicked(event: any) {
    console.log(event);
  }
}
