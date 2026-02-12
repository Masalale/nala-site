import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Order, OrderInsert } from '../types/shop';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
  items: any[]
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
      p_items: items
    });

  if (error) {
    console.error('Error creating order:', error);
    return { order: null, error: error.message };
  }

  if (data.validation_errors && data.validation_errors.length > 0) {
    return { order: null, error: data.validation_errors.join(', ') };
  }

  const { data: orderData, error: fetchError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', data.order_id)
    .single();

  if (fetchError) {
    console.error('Error fetching created order:', fetchError);
    return { order: null, error: 'Order created but could not be retrieved' };
  }

  return { order: orderData as Order, error: null };
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
    .from('orders')
    .select('*')
    .eq('public_ref', publicRef)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data as Order;
}

export async function checkRateLimit(
  keyId: string,
  maxRequests: number = 5,
  windowMinutes: number = 60
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { allowed: true, remaining: maxRequests, resetTime: new Date(Date.now() + windowMinutes * 60 * 1000) };
  }

  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .rpc('check_and_increment_rate_limit', {
      p_key_id: keyId,
      p_window_start: windowStart,
      p_max_requests: maxRequests
    });

  if (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true, remaining: maxRequests, resetTime: new Date(Date.now() + windowMinutes * 60 * 1000) };
  }

  return {
    allowed: data.allowed,
    remaining: data.remaining,
    resetTime: new Date(data.reset_time)
  };
}

/*
 * SECURITY NOTES FOR SUPABASE:
 *
 * 1. Enable Row Level Security (RLS) on the orders table
 * 2. Create a policy that only allows reading orders by public_ref
 * 3. Implement rate limiting using Supabase Edge Functions or a WAF
 * 4. Consider adding a created_at index for performance
 *
 * Example RLS Policy:
 * CREATE POLICY "Allow public read by ref" ON orders
 * FOR SELECT USING (true);
 *
 * DO NOT allow UPDATE or DELETE from the client
 */
