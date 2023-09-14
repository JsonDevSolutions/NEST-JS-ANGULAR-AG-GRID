import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductService } from 'src/app/pages/product/product.service';

@Component({
  selector: 'app-published-indicator',
  templateUrl: './published-indicator.component.html',
  styleUrls: ['./published-indicator.component.css'],
})
export class PublishedIndicatorComponent implements ICellRendererAngularComp {
  productId!: number;
  isPublished!: boolean;

  constructor(private productService: ProductService) {}

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.productId = params.data.id;
    this.isPublished = params.data.published;
  }

  onUpdatePublish() {
    this.isPublished = !this.isPublished;
    this.productService
      .updateProductStatus(this.productId, this.isPublished)
      .subscribe();
  }
}
