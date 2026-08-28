import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/shop';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'detox',
    title: 'Detox Soap',
    price: 420,
    description: 'Purifying activated charcoal meets the richness of beef tallow to clear impurities without stripping the skin.',
    image: '/images/detox.webp',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Activated Charcoal', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'refreshing',
    title: 'Refreshing Soap',
    price: 420,
    description: 'A traditional tallow-based bar infused with rosemary for a deeply moisturizing, refreshing cleanse.',
    image: '/images/refreshing.webp',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive oil', 'Castor Oil', 'Rosemary', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'gentle-red',
    title: 'Gentle Red Soap',
    price: 420,
    description: 'Enriched with red clay and soothing oils, this gentle bar cleanses delicate skin without irritation.',
    image: '/images/gentle_red.webp',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Red Clay', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'turmeric',
    title: 'Turmeric Soap',
    price: 420,
    description: 'A healing tallow bar enriched with turmeric to naturally brighten skin and restore its natural glow.',
    image: '/images/turmeric.webp',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Turmeric', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'sensitive',
    title: 'Sensitive/ Eczema Soap',
    price: 420,
    description: 'Anti-inflammatory, soothes sensitive skin. Reduces itchiness and irritation.',
    image: '/images/sensitive.webp',
    ingredients: ['Saponified Beef Tallow', 'Coconut Oil', 'Olive Oil', 'Castor Oil', 'Oats', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'exfoliant',
    title: 'Exfoliant Soap',
    price: 420,
    description: 'Creamy goat milk and real coffee grounds combine to gently buff away dead skin while providing intense nourishment.',
    image: '/images/exfoliant.webp',
    ingredients: ['Goat Milk', 'Coffee grounds', 'Essential Oils'],
    badge: 'Sold Out',
    category: 'soap',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'soap-saver',
    title: 'Soap Saver/ Exfoliation Bag',
    price: 200,
    description: 'Extend the life of your soap bars while gently exfoliating your skin.',
    image: '/images/soap_saver.webp',
    ingredients: ['Natural Sisal Fiber'],
    badge: 'Sold Out',
    category: 'accessory',
    soldOut: true,
    stock: 0,
  },
  {
    id: 'bundle-full',
    title: 'The Nala Collection',
    price: 2100,
    description: 'Get all 5 signature soaps plus a wooden soap saver. The ultimate self-care package.',
    image: '/images/collection.webp',
    ingredients: ['All 5 Soaps', 'Soap Saver'],
    badge: 'Sold Out',
    category: 'bundle',
    soldOut: true,
    stock: 0,
  },
];

function useProductStockState(product: Product) {
  const { addToCart, items, stocks } = useCart();
  const cartItem = items.find(i => i.id === product.id);
  const qtyInCart = cartItem?.quantity ?? 0;
  const currentStock = stocks[product.id] ?? product.stock ?? (product.id === 'detox' ? 3 : product.id === 'refreshing' ? 3 : product.id === 'gentle-red' ? 7 : 0);
  const isSoldOut = product.soldOut || currentStock <= 0;
  const isMaxReached = qtyInCart >= currentStock;
  return { addToCart, currentStock, isSoldOut, isMaxReached };
}

function ProductModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const { addToCart, currentStock, isSoldOut, isMaxReached } = useProductStockState(product);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-scale ring-1 ring-black/5">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#da924b] text-[#3d5a3c] hover:brightness-110 transition-colors shadow-sm"
          aria-label="Close details"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5">
          <div className={`flex gap-4 mb-4 ${isSoldOut ? 'grayscale opacity-75' : ''}`}>
            <div className="relative w-36 h-36 shrink-0 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
              {!isSoldOut && currentStock <= 10 && (
                <span className="absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#b87333] border border-amber-200/60 shadow-sm">
                  {currentStock} left
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center py-1">
              {isSoldOut ? (
                <span className="inline-block bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 w-fit">Sold Out</span>
              ) : product.badge ? (
                <span className="inline-block bg-[#da924b] text-text text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 w-fit shadow-sm">{product.badge}</span>
              ) : null}
              <h3 className={`font-bold text-lg leading-tight mb-1 ${isSoldOut ? 'text-gray-500' : 'text-text'}`}>{product.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm ${isSoldOut ? 'text-gray-400 line-through' : 'text-[#da924b]'}`}>KES {product.price.toLocaleString()}</span>
                {product.category === 'soap' && !isSoldOut && (
                  <span className="text-[10px] font-bold bg-[#727b68] text-white px-1.5 py-0.5 rounded shadow-sm">2 for 500/=</span>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed mb-4">{product.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.ingredients?.map((ing: string) => (
              <span key={ing} className="bg-background border border-secondary/10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs text-text-muted font-medium">
                {ing}
              </span>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className={`w-full py-2.5 rounded-xl text-sm shadow-md shadow-secondary/20 ${(isSoldOut || isMaxReached) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (isSoldOut || isMaxReached) return;
              addToCart(product);
              onClose();
            }}
            disabled={isSoldOut || isMaxReached}
          >
            {isSoldOut ? 'Sold Out' : isMaxReached ? `Limit Reached (${currentStock})` : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index, isVisible, onOpen }: { product: Product, index: number, isVisible: boolean, onOpen: () => void }) {
  const { addToCart, currentStock, isSoldOut, isMaxReached } = useProductStockState(product);

  return (
    <div
      key={product.id}
      className={`group flex flex-col bg-surface rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${isSoldOut ? 'grayscale opacity-75' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-white cursor-pointer md:cursor-default" onClick={() => { if (window.innerWidth < 768) onOpen(); }}>
        <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 z-10 flex items-center justify-between pointer-events-none gap-1">
          {isSoldOut ? (
            <span className="text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-900/90 text-white backdrop-blur-sm shadow-sm">
              Sold Out
            </span>
          ) : product.badge ? (
            <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${
              product.badge === 'Special Offer' || product.badge === 'Sale' ? 'bg-[#701a2e] text-[#fff1f2]' : 'bg-[#da924b] text-text'
            }`}>
              {product.badge}
            </span>
          ) : <span />}

          {!isSoldOut && currentStock <= 10 && (
            <span className="text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#b87333] border border-amber-200/60 shadow-sm">
              {currentStock} left
            </span>
          )}
        </div>

        {!isSoldOut && product.category === 'soap' && (
          <span className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-10 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full bg-[#727b68] text-white shadow-sm">
            2 FOR 500/=
          </span>
        )}

        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
          <h3 className={`text-sm md:text-lg font-semibold leading-tight ${isSoldOut ? 'text-gray-500' : 'text-text'}`}>{product.title}</h3>
          <span className={`font-bold whitespace-nowrap text-sm md:text-base ${isSoldOut ? 'text-gray-400 line-through' : 'text-[#da924b]'}`}>
            KES {product.price.toLocaleString()}
          </span>
        </div>

        <div className="mb-3 md:mb-4">
          <p className="text-xs md:text-sm text-text-muted line-clamp-2 md:line-clamp-none leading-relaxed">{product.description}</p>
          <button onClick={onOpen} className="md:hidden text-xs font-medium text-secondary hover:text-primary transition-colors focus:outline-none flex items-center gap-1 mt-1">Read more</button>
        </div>

        <div className="hidden md:flex flex-wrap gap-1 mb-4 md:mb-6">
          {product.ingredients?.map((ing: string) => (
            <span key={ing} className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-[#faf8f3] border border-secondary/10 text-text-muted">
              {ing}
            </span>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className={`w-full mt-auto text-xs md:text-sm py-2 md:py-2.5 h-auto md:h-10 ${(isSoldOut || isMaxReached) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !isSoldOut && !isMaxReached && addToCart(product)}
          disabled={isSoldOut || isMaxReached}
        >
          {isSoldOut ? 'Sold Out' : isMaxReached ? `Limit Reached (${currentStock})` : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}

export function Products() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();
  const { maxStockMessage, clearMaxStockMessage } = useCart();
  const rawProducts = useQuery(api.products.getAll);

  const products = (rawProducts && rawProducts.length > 0 ? rawProducts : FALLBACK_PRODUCTS) as Product[];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) setSelectedProduct(product);
    }
  }, [location.search, products]);

  return (
    <section id="products" className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {maxStockMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex justify-between items-center shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{maxStockMessage}</span>
            </div>
            <button onClick={clearMaxStockMessage} className="text-amber-700 hover:text-amber-900 text-xs font-bold uppercase tracking-wider ml-4">
              Dismiss
            </button>
          </div>
        )}

        <div ref={ref} className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-5xl font-bold text-text mb-3 md:mb-4">Our Collection</h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            Handcrafted natural soaps & body care formulated for radiant, healthy skin
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {products
            .filter(p => p.badge !== 'Archived')
            .map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} isVisible={isVisible} onOpen={() => setSelectedProduct(product)} />
            ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            window.history.pushState({}, '', window.location.pathname);
          }}
        />
      )}
    </section>
  );
}
