export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  badge?: 'Bestseller' | 'Premium' | 'New' | 'Sale' | 'Archived' | 'Sold Out';
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
  badge?: 'Bestseller' | 'Premium' | 'New' | 'Sale' | 'Archived' | 'Sold Out';
  category: 'soap' | 'bundle' | 'accessory';
  quantity: number;
  soldOut?: boolean;
}

export type CustomerDetails = {
  name: string;
  phone: string;
}

// Derived from Convex getByRef query — single source of truth
import type { FunctionReturnType } from 'convex/server';
import type { api } from '../../convex/_generated/api';

export type Order = NonNullable<FunctionReturnType<typeof api.orders.getByRef>>;
