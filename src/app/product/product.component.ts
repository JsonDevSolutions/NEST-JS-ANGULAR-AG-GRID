import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './products';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { EditDeleteButtonComponent } from '../common-components/edit-delete-button/edit-delete-button.component';
import { FormBuilder } from '@angular/forms';
import { PublishedIndicatorComponent } from '../common-components/published-indicator/published-indicator.component';
import { NumberRegex } from '../constants/Regex';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  private gridApi!: GridApi;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {}

  rowData!: Observable<Product[]>;
  columnDefs: ColDef[] = [
    { field: 'name', resizable: true },
    { field: 'description' },
    {
      field: 'price',
      maxWidth: 110,
      valueFormatter: this.currencyFormatter,
      editable: true,
    },
    {
      field: 'published',
      maxWidth: 100,
      cellRenderer: PublishedIndicatorComponent,
    },
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

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value,
    );
  }

  currencyFormatter(params: ValueFormatterParams) {
    return '$' + params.value.toFixed(2).replace(NumberRegex.COUNT, '$1,');
  }

  ngOnInit(): void {
    this.rowData = this.productService.getProducts();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
