export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
   badge?: 'Bestseller' | 'Premium' | 'New' | 'Sale' | 'Archived' | null;
  category: 'soap' | 'bundle' | 'accessory';
  soldOut?: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
   badge?: 'Bestseller' | 'Premium' | 'New' | 'Sale' | 'Archived' | null;
  category: 'soap' | 'bundle' | 'accessory';
  quantity: number;
  soldOut?: boolean;
}

export type CustomerDetails = {
  name: string;
  phone: string;
}

export type Order = {
  id: string;
  public_ref: string;
  customer_name: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  link: string;
  created_at: string;
}

export type OrderInsert = {
  public_ref: string;
  customer_name: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  link: string;
}
