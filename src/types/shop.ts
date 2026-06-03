export interface Shop {
  id: number;
  name: string;
  image: string;
  rating: number;
  monthSales: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrderAmount: number;
  distance: number;
  tags: string[];
  announcement?: string;
  categoryId?: number;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
}
