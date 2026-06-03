import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  shopId: number;
}

export interface CartState {
  items: CartItem[];
  shopId?: number;
  totalPrice: number;
}
