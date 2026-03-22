import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const cartItemValidator = v.object({
  id: v.string(),
  title: v.string(),
  price: v.number(),
  image: v.string(),
  description: v.string(),
  ingredients: v.array(v.string()),
  badge: v.optional(
    v.union(
      v.literal('Bestseller'),
      v.literal('Premium'),
      v.literal('New'),
      v.literal('Sale'),
      v.literal('Archived'),
      v.literal('Sold Out')
    )
  ),
  category: v.union(
    v.literal('soap'),
    v.literal('bundle'),
    v.literal('accessory')
  ),
  quantity: v.number(),
  soldOut: v.optional(v.boolean()),
});

export const createOrder = mutation({
  args: {
    publicRef: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(cartItemValidator),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    const { publicRef, customerName, customerPhone, items, link } = args;

    // Validation
    const errors: string[] = [];

    if (!publicRef || publicRef.length !== 8) {
      errors.push('Invalid order reference');
    }

    if (!customerName || customerName.trim().length < 2) {
      errors.push('Customer name is required');
    }

    if (!customerPhone || customerPhone.trim().length < 9) {
      errors.push('Customer phone is required');
    }

    if (!items || items.length === 0) {
      errors.push('Order must contain at least one item');
    }

    if (errors.length > 0) {
      return { orderId: null, validationErrors: errors };
    }

    // Check for duplicate publicRef
    const existing = await ctx.db
      .query('orders')
      .withIndex('by_public_ref', (q) => q.eq('publicRef', publicRef))
      .first();

    if (existing) {
      return { orderId: null, validationErrors: ['Duplicate order reference'] };
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderId = await ctx.db.insert('orders', {
      publicRef,
      customerName,
      customerPhone,
      items,
      total,
      link,
    });

    return { orderId, validationErrors: [] };
  },
});

export const getByRef = query({
  args: { publicRef: v.string() },
  handler: async (ctx, { publicRef }) => {
    const order = await ctx.db
      .query('orders')
      .withIndex('by_public_ref', (q) => q.eq('publicRef', publicRef))
      .first();

    if (!order) return null;

    return {
      id: order._id,
      public_ref: order.publicRef,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      items: order.items,
      total: order.total,
      link: order.link,
      created_at: new Date(order._creationTime).toISOString(),
    };
  },
});
