import { query } from './_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query('products').collect();
    const mapped = products.map(({ slug, ...rest }) => ({
      ...rest,
      id: slug,
      soldOut: rest.soldOut ?? rest.badge === 'Sold Out',
    }));

    // Put sold out items at the end
    return mapped.sort((a, b) => {
      const aSold = a.soldOut ? 1 : 0;
      const bSold = b.soldOut ? 1 : 0;
      return aSold - bSold;
    });
  },
});
