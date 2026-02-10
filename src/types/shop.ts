export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  badge?: 'Bestseller' | 'Premium' | 'New' | null;
  category: 'soap' | 'bundle' | 'accessory';
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  badge?: 'Bestseller' | 'Premium' | 'New' | null;
  category: 'soap' | 'bundle' | 'accessory';
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  location: string;
  email?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  customer: CustomerDetails;
}
