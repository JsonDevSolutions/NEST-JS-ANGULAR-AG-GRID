import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductService } from '../../pages/product/product.service';

@Component({
  selector: 'app-edit-delete-button',
  templateUrl: './edit-delete-button.component.html',
  styleUrls: ['./edit-delete-button.component.css'],
})
export class EditDeleteButtonComponent implements ICellRendererAngularComp {
  productId!: number;
  removeTransaction!: () => void;

  constructor(private productService: ProductService) {}

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.productId = params.data.id;
    this.removeTransaction = () => {
      params.api.applyTransaction({ remove: [params.data] });
    };
  }

  onDelete() {
    this.productService
      .deleteProduct(this.productId)
      .subscribe({ complete: () => this.removeTransaction() });
  }
}
