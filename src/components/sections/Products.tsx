import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/shop';

function ProductModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const { addToCart } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content - Horizontal "Media Card" Layout" */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-scale ring-1 ring-black/5">
        {/* Close Button */}
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
          {/* Header: Image + Metadata Side-by-Side */}
          <div className="flex gap-4 mb-4">
            <div className="relative w-40 h-40 shrink-0 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center py-1">
              {product.badge && (
                <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 w-fit">
                  {product.badge}
                </span>
              )}
              <h3 className="font-bold text-text text-lg leading-tight mb-1">{product.title}</h3>
              <span className="text-secondary font-bold text-sm">KES {product.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Body: Full Description (No Scroll, No Clamp) */}
          <p className="text-sm text-text-muted leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Ingredients */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.ingredients?.map((ing: string) => (
              <span key={ing} className="bg-background border border-secondary/10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs text-text-muted font-medium">
                {ing}
              </span>
            ))}
          </div>

          {/* Action */}
          <Button
            variant="secondary"
            size="sm"
            className="w-full py-2.5 rounded-xl text-sm shadow-md shadow-secondary/20"
            onClick={() => {
              addToCart(product);
              onClose();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index, isVisible, onOpen }: { product: Product, index: number, isVisible: boolean, onOpen: () => void }) {
  const { addToCart } = useCart();
  return (
    <div
      key={product.id}
      className={`group flex flex-col bg-surface rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="relative aspect-square overflow-hidden bg-white cursor-pointer md:cursor-default"
        onClick={() => {
          // Only trigger modal on mobile via image click
          if (window.innerWidth < 768) onOpen();
        }}
      >
        {product.badge && (
          <span className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-primary text-text text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full">
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
      <div className="p-3 md:p-6 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
          <h3 className="text-sm md:text-lg font-semibold text-text leading-tight">{product.title}</h3>
          <span className="text-secondary font-bold whitespace-nowrap text-sm md:text-base">KES {product.price.toLocaleString()}</span>
        </div>

        {/* Short Description */}
        <div className="mb-3 md:mb-4">
          {/* Mobile: Clamped. Desktop: Full text */}
          <p className="text-xs md:text-sm text-text-muted line-clamp-2 md:line-clamp-none">
            {product.description}
          </p>

          {/* Mobile Trigger - Modal */}
          <button
            onClick={onOpen}
            className="md:hidden text-xs font-medium text-secondary hover:text-primary transition-colors focus:outline-none flex items-center gap-1 mt-1"
          >
            Read more
          </button>
        </div>

        <div className="hidden md:flex flex-wrap gap-1 mb-4 md:mb-6">
          {product.ingredients?.map((ing: string) => (
            <span key={ing} className="text-[10px] md:text-xs bg-background px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-text-muted">
              {ing}
            </span>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-auto text-xs md:text-sm py-2 md:py-2.5 h-auto md:h-10"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export function Products() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [location.search]);

  return (
    <section id="products" className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-text mb-3 md:mb-4">
            Our Collection
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            Unique formulas, each designed for specific skin needs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
              onOpen={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Modal (Mobile Only) */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            // Clear the URL query parameter without refreshing
            const newUrl = window.location.pathname;
            window.history.pushState({}, '', newUrl);
          }}
        />
      )}
    </section>
  );
}
