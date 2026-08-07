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
      v.literal('Sold Out'),
      v.literal('Special Offer'),
      v.literal('Limited Stock')
    )
  ),
  category: v.union(
    v.literal('soap'),
    v.literal('bundle'),
    v.literal('accessory')
  ),
  quantity: v.number(),
  soldOut: v.optional(v.boolean()),
  stock: v.optional(v.number()),
});

export const createOrder = mutation({
  args: {
    publicRef: v.string(),
    viewToken: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(cartItemValidator),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    const { publicRef, viewToken, customerName, customerPhone, items, link } = args;

    // Validation
    const errors: string[] = [];

    if (!publicRef || publicRef.length !== 8) {
      errors.push('Invalid order reference');
    }

    if (!viewToken || viewToken.length !== 12) {
      errors.push('Invalid view token');
    }

    if (!customerName || customerName.trim().length < 2) {
      errors.push('Customer name is required');
    }

    if (!customerPhone || customerPhone.trim().length < 9) {
      errors.push('Customer phone is required');
    } else if (!/^(?:\+?254|0)[17]\d{8}$/.test(customerPhone.trim())) {
      errors.push('Invalid phone number format');
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

    // Calculate total with 2-for-500 offer on soaps
    const soapItems = items.filter(i => i.category === 'soap');
    const totalSoapQty = soapItems.reduce((acc, i) => acc + i.quantity, 0);
    const soapPairs = Math.floor(totalSoapQty / 2);
    const remainingSoaps = totalSoapQty % 2;

    const nonSoapTotal = items
      .filter(i => i.category !== 'soap')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const total = (soapPairs * 500) + (remainingSoaps * 420) + nonSoapTotal;

    const orderId = await ctx.db.insert('orders', {
      publicRef,
      viewToken,
      customerName,
      customerPhone,
      items,
      total,
      link,
    });

    // Deduct stock from products database dynamically
    for (const item of items) {
      const product = await ctx.db
        .query('products')
        .withIndex('by_slug', (q) => q.eq('slug', item.id))
        .first();

      if (product) {
        const currentStock =
          product.stock !== undefined
            ? product.stock
            : product.slug === 'detox'
            ? 3
            : product.slug === 'refreshing'
            ? 3
            : product.slug === 'gentle-red'
            ? 7
            : 0;

        const newStock = Math.max(0, currentStock - item.quantity);
        const isSoldOut = newStock === 0;

        await ctx.db.patch(product._id, {
          stock: newStock,
          soldOut: isSoldOut,
          ...(isSoldOut ? { badge: 'Sold Out' as const } : {}),
        });
      }
    }

    return { orderId, validationErrors: [] };
  },
});

export const getByRef = query({
  args: { publicRef: v.string(), viewToken: v.optional(v.string()) },
  handler: async (ctx, { publicRef, viewToken }) => {
    // Legacy orders have no viewToken — look up by ref only
    // New orders require both ref + token for security
    const order = viewToken
      ? await ctx.db
          .query('orders')
          .withIndex('by_ref_and_token', (q) => q.eq('publicRef', publicRef).eq('viewToken', viewToken))
          .first()
      : await ctx.db
          .query('orders')
          .withIndex('by_public_ref', (q) => q.eq('publicRef', publicRef))
          .first();

    if (!order) return null;

    // Block access if order has a token but none was provided
    if (order.viewToken && !viewToken) return null;

    return {
      id: order._id,
      public_ref: order.publicRef,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      items: order.items,
      total: order.total,
      link: order.link,
      view_token: order.viewToken,
      created_at: new Date(order._creationTime).toISOString(),
    };
  },
});
