import { query } from './_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query('products').collect();
    // Map slug -> id to match the frontend Product type
    return products.map(({ slug, ...rest }) => ({
      ...rest,
      id: slug,
    }));
  },
});
