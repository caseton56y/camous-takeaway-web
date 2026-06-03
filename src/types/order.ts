import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'delivering' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  shopName: string;
  shopImage: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  status: OrderStatus;
  createTime: string;
  estimatedDeliveryTime?: string;
  address?: {
    name: string;
    phone: string;
    detail: string;
  };
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}
