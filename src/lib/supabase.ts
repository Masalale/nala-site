import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Order, OrderInsert } from '../types/shop';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type CreateOrderValidationResult = {
  order_id: string | null;
  validation_errors: string[];
};

let didWarnMissingEnv = false;
let supabaseClient: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!supabaseUrl || !supabaseKey) {
    if (!didWarnMissingEnv) {
      console.warn('Supabase is not configured: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      didWarnMissingEnv = true;
    }
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
};

export async function createOrder(order: OrderInsert): Promise<Order | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return data as Order;
}

export async function createOrderWithValidation(
  publicRef: string,
  customerName: string,
  customerPhone: string,
  items: any[],
  link: string
): Promise<{ order: Order | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      order: null,
      error: 'Order service is temporarily unavailable. Please try again later.'
    };
  }

  const { data, error } = await supabase
    .rpc('create_order_with_validation', {
      p_public_ref: publicRef,
      p_customer_name: customerName,
      p_customer_phone: customerPhone,
      p_items: items,
      p_link: link
    });

  const result = data as CreateOrderValidationResult | null;

  if (error) {
    console.error('Error creating order:', error);
    return { order: null, error: error.message };
  }

  if (!result) {
    return { order: null, error: 'Order service returned an empty response' };
  }

  if (result.validation_errors && result.validation_errors.length > 0) {
    return { order: null, error: result.validation_errors.join(', ') };
  }

  const orderData = await getOrderByRef(publicRef);

  if (!orderData) {
    return { order: null, error: 'Order created but could not be retrieved' };
  }

  return { order: orderData, error: null };
}

export async function getOrderByRef(publicRef: string): Promise<Order | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  if (publicRef.length !== 8) {
    console.error('Invalid reference format');
    return null;
  }

  const { data, error } = await supabase
    .rpc('get_order_by_public_ref', {
      p_public_ref: publicRef
    });

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data as Order | null;
}

/*
 * SECURITY NOTES FOR SUPABASE:
 *
 * 1. Enable Row Level Security (RLS) on the orders table
 * 2. Use SECURITY DEFINER RPC functions for order writes and reads
 * 3. Restrict direct table reads from the anon role
 * 4. Consider adding a created_at index for performance
 *
 * Example RLS Policy:
 * CREATE POLICY "No direct reads for anon" ON orders
 * FOR SELECT TO anon USING (false);
 *
 * DO NOT allow UPDATE or DELETE from the client
 */
