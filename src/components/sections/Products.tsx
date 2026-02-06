import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

const products = [
  {
    id: 'refreshing',
    title: 'Refreshing Soap',
    description: 'A traditional tallow-based bar infused with rosemary for a deeply moisturizing, refreshing cleanse.',
    image: '/images/refreshing.jpg',
    price: '420 KES',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive oil', 'Castor Oil', 'Rosemary', 'Essential Oils'],
    badge: 'Bestseller',
  },
  {
    id: 'turmeric',
    title: 'Turmeric Soap',
    description: 'A healing tallow bar enriched with turmeric to naturally brighten skin and restore its natural glow.',
    image: '/images/turmeric.jpg',
    price: '420 KES',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Turmeric', 'Essential Oils'],
    badge: 'Premium',
  },
  {
    id: 'detox',
    title: 'Detox Soap',
    description: 'Purifying activated charcoal meets the richness of beef tallow to clear impurities without stripping the skin.',
    image: '/images/detox.jpg',
    price: '420 KES',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Activated Charcoal', 'Essential Oils'],
    badge: null,
  },
  {
    id: 'exfoliant',
    title: 'Exfoliant Soap',
    description: 'Creamy goat milk and real coffee grounds combine to gently buff away dead skin while providing intense nourishment.',
    image: '/images/exfoliant.jpg',
    price: '420 KES',
    ingredients: ['Goat Milk', 'Coffee grounds', 'Essential Oils'],
    badge: null,
  },
];

function ProductCard({ product, index, isVisible }: { product: any, index: number, isVisible: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      key={product.id}
      className={`group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-primary text-text text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-text">{product.title}</h3>
          <span className="text-secondary font-bold">{product.price}</span>
        </div>

        <div className="relative mb-4">
          <p className={`text-sm text-text-muted transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-secondary hover:text-primary transition-colors mt-1 focus:outline-none"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mb-6">
          {product.ingredients.map((ing: string) => (
            <span key={ing} className="text-xs bg-background px-2 py-1 rounded-full text-text-muted">
              {ing}
            </span>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="w-full mt-auto">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export function Products() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="products" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Unique formulas, each designed for specific skin needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
