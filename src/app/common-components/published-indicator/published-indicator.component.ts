import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-published-indicator',
  templateUrl: './published-indicator.component.html',
  styleUrls: ['./published-indicator.component.css'],
})
export class PublishedIndicatorComponent implements ICellRendererAngularComp {
  isPublished!: boolean;

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.isPublished = params.data.published;
  }
}
