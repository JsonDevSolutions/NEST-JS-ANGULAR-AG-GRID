import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';
import { HttpConfigService } from 'src/app/core/services/http-config.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private httpConfigService: HttpConfigService,
  ) {}

  host = this.httpConfigService.getHost();
  headers = this.httpConfigService.getHeaders();

  addProduct(product: any) {
    return this.http.post(`${this.host}/product`, product, {
      headers: this.headers,
    });
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.host}/product`, {
      headers: this.headers,
    });
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.host}/product/${productId}`, {
      headers: this.headers,
    });
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.host}/product/${product.id}`, product, {
      headers: this.headers,
    });
  }

  updateProductStatus(productId: number, published: boolean) {
    return this.http.put(
      `${this.host}/product/status/${productId}`,
      { published },
      { headers: this.headers },
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.host}/product/${productId}`, {
      headers: this.headers,
    });
  }
}
