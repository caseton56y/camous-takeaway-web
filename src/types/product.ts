export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  sales: number;
  stock: number;
  categoryId: number;
  shopId: number;
  tags?: string[];
}
