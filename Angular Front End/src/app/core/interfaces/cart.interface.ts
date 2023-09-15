import { Product } from './product.interface';

export interface Cart {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}
