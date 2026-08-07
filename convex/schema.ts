import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const badgeValidator = v.optional(
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
);

export const categoryValidator = v.union(
  v.literal('soap'),
  v.literal('bundle'),
  v.literal('accessory')
);

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    title: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
    ingredients: v.array(v.string()),
    badge: badgeValidator,
    category: categoryValidator,
    soldOut: v.optional(v.boolean()),
    stock: v.optional(v.number()),
  }).index('by_slug', ['slug']),

  orders: defineTable({
    publicRef: v.string(),
    viewToken: v.optional(v.string()),
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        price: v.number(),
        image: v.string(),
        description: v.string(),
        ingredients: v.array(v.string()),
        badge: badgeValidator,
        category: categoryValidator,
        quantity: v.number(),
        soldOut: v.optional(v.boolean()),
        stock: v.optional(v.number()),
      })
    ),
    total: v.number(),
    link: v.string(),
  }).index('by_public_ref', ['publicRef'])
    .index('by_ref_and_token', ['publicRef', 'viewToken']),
});
