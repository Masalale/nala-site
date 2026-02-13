import type { Product } from '../types/shop';

export const products: Product[] = [
  {
    id: 'gentle-red-duo',
    title: 'Gentle Red Duo',
    description: 'Special Offer: Buy two Gentle Red bars for 800 /=! Enriched with red clay for delicate skin.',
    image: '/images/nanobanana.jpeg',
    price: 800,
    ingredients: ['2x Gentle Red Soap'],
    badge: 'Sale',
    category: 'bundle'
  },
  {
    id: 'refreshing',
    title: 'Refreshing Soap',
    description: 'A traditional tallow-based bar infused with rosemary for a deeply moisturizing, refreshing cleanse.',
    image: '/images/refreshing.jpeg',
    price: 420,
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive oil', 'Castor Oil', 'Rosemary', 'Essential Oils'],
    badge: 'Bestseller',
    category: 'soap'
  },
  {
    id: 'turmeric',
    title: 'Turmeric Soap',
    description: 'A healing tallow bar enriched with turmeric to naturally brighten skin and restore its natural glow.',
    image: '/images/turmeric.jpeg',
    price: 420,
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Turmeric', 'Essential Oils'],
    badge: 'Premium',
    category: 'soap'
  },
  {
    id: 'detox',
    title: 'Detox Soap',
    description: 'Purifying activated charcoal meets the richness of beef tallow to clear impurities without stripping the skin.',
    image: '/images/detox.jpeg',
    price: 420,
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Activated Charcoal', 'Essential Oils'],
    category: 'soap'
  },
  {
    id: 'exfoliant',
    title: 'Exfoliant Soap',
    description: 'Creamy goat milk and real coffee grounds combine to gently buff away dead skin while providing intense nourishment.',
    image: '/images/exfoliant.jpeg',
    price: 420,
    ingredients: ['Goat Milk', 'Coffee grounds', 'Essential Oils'],
    category: 'soap'
  },
  {
    id: 'gentle-red',
    title: 'Gentle Red Soap',
    description: 'Enriched with red clay and soothing oils, this gentle bar cleanses delicate skin without irritation.',
    image: '/images/gentle_red.jpeg',
    price: 420,
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Red Clay', 'Essential Oils'],
    badge: 'New',
    category: 'soap'
  },

  {
    id: 'soap-saver',
    title: 'Soap Saver/ Exfoliation Bag',
    description: 'Extend the life of your soap bars while gently exfoliating your skin. Perfect for using up soap remnants and creating a luxurious lather.',
    image: '/images/soap_saver.jpeg',
    price: 200,
    ingredients: ['Natural Sisal Fiber'],
    category: 'accessory'
  },
  {
    id: 'bundle-full',
    title: 'The Nala Collection',
    description: 'Get all 5 signature soaps plus a wooden soap saver. The ultimate self-care package.',
    image: '/images/collection.jpeg',
    price: 2100,
    ingredients: ['All 5 Soaps', 'Soap Saver'],
    badge: 'Premium',
    category: 'bundle'
  }
];
