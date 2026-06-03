import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: '招牌小面',
    image: 'https://picsum.photos/id/292/300/300',
    price: 15,
    description: '正宗重庆小面，麻辣鲜香',
    sales: 567,
    stock: 100,
    categoryId: 1,
    shopId: 1,
    tags: ['招牌']
  },
  {
    id: 2,
    name: '豌杂面',
    image: 'https://picsum.photos/id/312/300/300',
    price: 18,
    description: '豌豆炸酱面，口感丰富',
    sales: 432,
    stock: 80,
    categoryId: 1,
    shopId: 1
  },
  {
    id: 3,
    name: '香辣炸鸡',
    image: 'https://picsum.photos/id/326/300/300',
    price: 28,
    originalPrice: 35,
    description: '外酥里嫩，香辣可口',
    sales: 890,
    stock: 50,
    categoryId: 2,
    shopId: 2,
    tags: ['热销']
  },
  {
    id: 4,
    name: '蜂蜜芥末炸鸡',
    image: 'https://picsum.photos/id/401/300/300',
    price: 30,
    description: '蜂蜜芥末酱，甜辣适中',
    sales: 654,
    stock: 45,
    categoryId: 2,
    shopId: 2
  },
  {
    id: 5,
    name: '珍珠奶茶',
    image: 'https://picsum.photos/id/431/300/300',
    price: 12,
    originalPrice: 15,
    description: 'Q弹珍珠，浓郁奶香',
    sales: 1234,
    stock: 200,
    categoryId: 3,
    shopId: 3,
    tags: ['招牌']
  },
  {
    id: 6,
    name: '杨枝甘露',
    image: 'https://picsum.photos/id/570/300/300',
    price: 18,
    description: '新鲜芒果，椰香浓郁',
    sales: 876,
    stock: 80,
    categoryId: 3,
    shopId: 3
  },
  {
    id: 7,
    name: '炸酱面',
    image: 'https://picsum.photos/id/580/300/300',
    price: 16,
    description: '传统炸酱面，酱香浓郁',
    sales: 543,
    stock: 90,
    categoryId: 1,
    shopId: 4
  },
  {
    id: 8,
    name: '牛肉披萨',
    image: 'https://picsum.photos/id/625/300/300',
    price: 58,
    originalPrice: 68,
    description: '大块牛肉，芝士拉丝',
    sales: 321,
    stock: 30,
    categoryId: 7,
    shopId: 5,
    tags: ['招牌']
  },
  {
    id: 9,
    name: '麻婆豆腐',
    image: 'https://picsum.photos/id/835/300/300',
    price: 22,
    description: '麻辣鲜香，下饭神器',
    sales: 678,
    stock: 60,
    categoryId: 1,
    shopId: 6
  },
  {
    id: 10,
    name: '水煮肉片',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 35,
    description: '肉质鲜嫩，麻辣过瘾',
    sales: 456,
    stock: 45,
    categoryId: 1,
    shopId: 6
  },
  {
    id: 11,
    name: '提拉米苏',
    image: 'https://picsum.photos/id/292/300/300',
    price: 25,
    description: '意式经典，入口即化',
    sales: 567,
    stock: 35,
    categoryId: 2,
    shopId: 7,
    tags: ['招牌']
  },
  {
    id: 12,
    name: '芒果班戟',
    image: 'https://picsum.photos/id/312/300/300',
    price: 18,
    description: '新鲜芒果，奶油绵密',
    sales: 432,
    stock: 40,
    categoryId: 2,
    shopId: 7
  }
];

export const getProductsByShopId = (shopId: number): Product[] => {
  return products.filter(p => p.shopId === shopId);
};
