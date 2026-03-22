import { ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { CartItem, Order } from '../types/shop';

const convexUrl = import.meta.env.VITE_CONVEX_URL;

let didWarnMissingEnv = false;
let _client: ConvexReactClient | null = null;

export function getConvexClient(): ConvexReactClient | null {
  if (_client) return _client;

  if (!convexUrl) {
    if (!didWarnMissingEnv) {
      console.warn('Convex is not configured: missing VITE_CONVEX_URL');
      didWarnMissingEnv = true;
    }
    return null;
  }

  _client = new ConvexReactClient(convexUrl);
  return _client;
}

export async function createOrderWithValidation(
  publicRef: string,
  customerName: string,
  customerPhone: string,
  items: CartItem[],
  link: string
): Promise<{ order: Order | null; error: string | null }> {
  const client = getConvexClient();
  if (!client) {
    return {
      order: null,
      error: 'Order service is temporarily unavailable. Please try again later.',
    };
  }

  try {
    const result = await client.mutation(api.orders.createOrder, {
      publicRef,
      customerName,
      customerPhone,
      items,
      link,
    });

    if (result.validationErrors && result.validationErrors.length > 0) {
      return { order: null, error: result.validationErrors.join(', ') };
    }

    if (!result.orderId) {
      return { order: null, error: 'Order service returned an empty response' };
    }

    const order = await getOrderByRef(publicRef);
    if (!order) {
      return { order: null, error: 'Order created but could not be retrieved' };
    }

    return { order, error: null };
  } catch (err) {
    console.error('Error creating order:', err);
    return { order: null, error: 'Failed to place order. Please try again.' };
  }
}

export async function getOrderByRef(publicRef: string): Promise<Order | null> {
  const client = getConvexClient();
  if (!client) return null;

  if (publicRef.length !== 8) {
    console.error('Invalid reference format');
    return null;
  }

  try {
    const data = await client.query(api.orders.getByRef, { publicRef });
    return data as Order | null;
  } catch (err) {
    console.error('Error fetching order:', err);
    return null;
  }
}
