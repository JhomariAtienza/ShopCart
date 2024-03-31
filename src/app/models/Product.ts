export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string;
  quantity: number;
  itemsSold?: number;
}
