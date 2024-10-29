export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  inStock: boolean;
  stockCount?: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stockCount: number;
}