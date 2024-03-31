import { Product } from "./Product"; 
export interface CartItem {
    id: string;
    userId: number;
    product: Product;
  }
  