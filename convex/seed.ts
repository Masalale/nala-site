import { internalMutation } from './_generated/server';

// Run once: npx convex run seed:seedOrders
export const seedOrders = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('orders').first();
    if (existing) {
      console.log('Orders already seeded, skipping.');
      return;
    }

    const orders = [
      {
        publicRef: 'VBsiaP6y',
        viewToken: 'yZaBcDeFgHiJ',
        customerName: 'Nash Nash',
        customerPhone: '254706637515',
        items: [
          {
            id: 'refreshing',
            badge: 'Bestseller' as const,
            image: '/images/refreshing.webp',
            price: 420,
            title: 'Refreshing Soap',
            category: 'soap' as const,
            quantity: 1,
            description: 'A traditional tallow-based bar infused with rosemary for a deeply moisturizing, refreshing cleanse.',
            ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive oil', 'Castor Oil', 'Rosemary', 'Essential Oils'],
          },
        ],
        total: 420,
        link: 'https://nalather.vercel.app/invoice?ref=VBsiaP6y',
      },
      {
        publicRef: 'avtJCp36',
        viewToken: 'aBcDeFgHiJkL',
        customerName: 'Kui Njogu',
        customerPhone: '0724606408',
        items: [
          {
            id: 'turmeric',
            badge: 'Premium' as const,
            image: '/images/turmeric.webp',
            price: 420,
            title: 'Turmeric Soap',
            category: 'soap' as const,
            quantity: 1,
            description: 'A healing tallow bar enriched with turmeric to naturally brighten skin and restore its natural glow.',
            ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Turmeric', 'Essential Oils'],
          },
        ],
        total: 420,
        link: 'https://nalather.vercel.app/invoice?ref=avtJCp36',
      },
      {
        publicRef: 'P2AoIDSE',
        viewToken: 'mNoPqRsTuVwX',
        customerName: 'Njenga Karanja',
        customerPhone: '0721574426',
        items: [
          {
            id: 'detox',
            image: '/images/detox.webp',
            price: 420,
            title: 'Detox Soap',
            category: 'soap' as const,
            quantity: 2,
            description: 'Purifying activated charcoal meets the richness of beef tallow to clear impurities without stripping the skin.',
            ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Activated Charcoal', 'Essential Oils'],
          },
          {
            id: 'exfoliant',
            image: '/images/exfoliant.webp',
            price: 420,
            title: 'Exfoliant Soap',
            category: 'soap' as const,
            quantity: 2,
            description: 'Creamy goat milk and real coffee grounds combine to gently buff away dead skin while providing intense nourishment.',
            ingredients: ['Goat Milk', 'Coffee grounds', 'Essential Oils'],
          },
          {
            id: 'gentle-red',
            badge: 'New' as const,
            image: '/images/gentle_red.webp',
            price: 420,
            title: 'Gentle Red Soap',
            category: 'soap' as const,
            quantity: 2,
            description: 'Enriched with red clay and soothing oils, this gentle bar cleanses delicate skin without irritation.',
            ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Red Clay', 'Essential Oils'],
          },
        ],
        total: 2520,
        link: 'https://nalather.vercel.app/invoice?ref=P2AoIDSE',
      },
    ];

    for (const order of orders) {
      await ctx.db.insert('orders', order);
    }

    console.log(`Seeded ${orders.length} orders.`);
  },
});

// Run once: npx convex run seed:seedProducts
export const seedProducts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').first();
    if (existing) {
      console.log('Products already seeded, skipping.');
      return;
    }

    const products = [
      {
        slug: 'soap-saver',
        title: 'Soap Saver/ Exfoliation Bag',
        description:
          'Extend the life of your soap bars while gently exfoliating your skin. Perfect for using up soap remnants and creating a luxurious lather.',
        image: '/images/soap_saver.webp',
        price: 200,
        ingredients: ['Natural Sisal Fiber'],
        badge: 'Sold Out' as const,
        category: 'accessory' as const,
        soldOut: true,
      },
      {
        slug: 'bundle-full',
        title: 'The Nala Collection',
        description:
          'Get all 5 signature soaps plus a wooden soap saver. The ultimate self-care package.',
        image: '/images/collection.webp',
        price: 2100,
        ingredients: ['All 5 Soaps', 'Soap Saver'],
        badge: 'Premium' as const,
        category: 'bundle' as const,
        soldOut: true,
      },
      {
        slug: 'refreshing',
        title: 'Refreshing Soap',
        description:
          'A traditional tallow-based bar infused with rosemary for a deeply moisturizing, refreshing cleanse.',
        image: '/images/refreshing.webp',
        price: 420,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive oil',
          'Castor Oil',
          'Rosemary',
          'Essential Oils',
        ],
        badge: 'Bestseller' as const,
        category: 'soap' as const,
      },
      {
        slug: 'turmeric',
        title: 'Turmeric Soap',
        description:
          'A healing tallow bar enriched with turmeric to naturally brighten skin and restore its natural glow.',
        image: '/images/turmeric.webp',
        price: 420,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive Oil',
          'Castor Oil',
          'Turmeric',
          'Essential Oils',
        ],
        badge: 'Premium' as const,
        category: 'soap' as const,
      },
      {
        slug: 'gentle-red',
        title: 'Gentle Red Soap',
        description:
          'Enriched with red clay and soothing oils, this gentle bar cleanses delicate skin without irritation.',
        image: '/images/gentle_red.webp',
        price: 420,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive Oil',
          'Castor Oil',
          'Red Clay',
          'Essential Oils',
        ],
        badge: 'New' as const,
        category: 'soap' as const,
      },
      {
        slug: 'sensitive',
        title: 'Sensitive/ Eczema Soap',
        description:
          'Anti-inflammatory, soothes sensitive skin. Reduces itchiness and irritation.',
        image: '/images/sensitive.webp',
        price: 420,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive Oil',
          'Castor Oil',
          'Oats',
          'Essential Oils',
        ],
        badge: 'New' as const,
        category: 'soap' as const,
      },
      {
        slug: 'detox',
        title: 'Detox Soap',
        description:
          'Purifying activated charcoal meets the richness of beef tallow to clear impurities without stripping the skin.',
        image: '/images/detox.webp',
        price: 420,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive Oil',
          'Castor Oil',
          'Activated Charcoal',
          'Essential Oils',
        ],
        category: 'soap' as const,
      },
      {
        slug: 'exfoliant',
        title: 'Exfoliant Soap',
        description:
          'Creamy goat milk and real coffee grounds combine to gently buff away dead skin while providing intense nourishment.',
        image: '/images/exfoliant.webp',
        price: 420,
        ingredients: ['Goat Milk', 'Coffee grounds', 'Essential Oils'],
        category: 'soap' as const,
      },
      {
        slug: 'gentle-red-duo',
        title: 'Gentle Red Duo',
        description: 'Two Gentle Red Soap bars. Save 40 KES!',
        image: '/images/gentle_red.webp',
        price: 800,
        ingredients: [
          'Saponified Beef Tallow',
          'Coconut Oil',
          'Olive Oil',
          'Castor Oil',
          'Red Clay',
          'Essential Oils',
        ],
        badge: 'Sale' as const,
        category: 'bundle' as const,
      },
    ];

    for (const product of products) {
      await ctx.db.insert('products', product);
    }

    console.log(`Seeded ${products.length} products.`);
  },
});
