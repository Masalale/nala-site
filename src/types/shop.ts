export type ProductBadge = 'Bestseller' | 'Premium' | 'New' | 'Sale' | 'Archived' | 'Sold Out' | 'Special Offer' | 'Limited Stock';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  badge?: ProductBadge;
  category: 'soap' | 'bundle' | 'accessory';
  soldOut?: boolean;
  stock?: number;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  badge?: ProductBadge;
  category: 'soap' | 'bundle' | 'accessory';
  quantity: number;
  soldOut?: boolean;
  stock?: number;
}

export type CustomerDetails = {
  name: string;
  phone: string;
}

// Derived from Convex getByRef query — single source of truth
import type { FunctionReturnType } from 'convex/server';
import type { api } from '../../convex/_generated/api';

export type Order = NonNullable<FunctionReturnType<typeof api.orders.getByRef>>;
