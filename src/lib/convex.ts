import { ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { CartItem, Order } from '../types/shop';

const convexUrl = import.meta.env.VITE_CONVEX_URL;

let didWarnMissingEnv = false;
let _client: ConvexReactClient | null = null;
const ORDER_FETCH_RETRY_DELAYS_MS = [100, 250, 500] as const;

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
  viewToken: string,
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
      viewToken,
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

    let order = await getOrderByRef(publicRef, viewToken);
    if (!order) {
      for (const delayMs of ORDER_FETCH_RETRY_DELAYS_MS) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        order = await getOrderByRef(publicRef, viewToken);
        if (order) break;
      }
    }

    if (!order) {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      order = {
        id: result.orderId,
        public_ref: publicRef,
        customer_name: customerName,
        customer_phone: customerPhone,
        items,
        total,
        link,
        view_token: viewToken,
        created_at: new Date().toISOString(),
      };
    }

    return { order, error: null };
  } catch (err) {
    console.error('Error creating order:', err);
    return { order: null, error: 'Failed to place order. Please try again.' };
  }
}

export async function getOrderByRef(publicRef: string, viewToken?: string): Promise<Order | null> {
  const client = getConvexClient();
  if (!client) return null;

  if (publicRef.length !== 8) {
    console.error('Invalid reference format');
    return null;
  }

  try {
    const data = await client.query(api.orders.getByRef, { publicRef, viewToken });
    return data ?? null;
  } catch (err) {
    console.error('Error fetching order:', err);
    return null;
  }
}
