import { Component, OnInit } from '@angular/core';
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { ProductService } from './product.service';
import { ValidatorService } from '../../core/services/validator.service';
import { Product } from './products';

import { EditDeleteButtonComponent } from '../../components/edit-delete-button/edit-delete-button.component';
import { PublishedIndicatorComponent } from '../../components/published-indicator/published-indicator.component';

import { NumberRegex } from '../../constants/Regex';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  private gridApi!: GridApi;
  isSubmitted!: boolean;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
  ) {}

  rowData!: Observable<Product[]>;
  columnDefs: ColDef[] = [
    { field: 'name', resizable: true, editable: true },
    { field: 'description', resizable: true, editable: true },
    {
      field: 'price',
      maxWidth: 110,
      valueFormatter: this.currencyFormatter,
      editable: true,
    },
    {
      field: 'published',
      maxWidth: 120,
      cellRenderer: PublishedIndicatorComponent,
    },
    { field: 'Action', minWidth: 150, cellRenderer: EditDeleteButtonComponent },
  ];

  defaultColDef: ColDef = {
    sortable: true,
  };

  addProductForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    published: true,
  });

  hasError(controlName: string, errorName: string): boolean {
    const control = this.addProductForm.get(controlName);
    return this.validatorService.hasError(control, errorName, this.isSubmitted);
  }

  showInputError(controlName: string): boolean {
    const control = this.addProductForm.get(controlName);
    return this.validatorService.showInputError(control, this.isSubmitted);
  }

  async onAddProduct() {
    this.isSubmitted = true;
    if (this.addProductForm.valid) {
      this.productService.addProduct(this.addProductForm.value).subscribe({
        complete: () => this.getProducts(),
      });
      this.addProductForm.reset();
      this.isSubmitted = false;
    }
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value,
    );
  }

  currencyFormatter(params: ValueFormatterParams) {
    return '$' + params.value.toFixed(2).replace(NumberRegex.COUNT, '$1,');
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    const { id, name, description, price } = event.data as Product;
    const product = { id, name, description, price };

    this.productService.updateProduct(product).subscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.rowData = this.productService.getProducts();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
