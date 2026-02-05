import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

const products = [
  {
    title: 'Refreshing Soap',
    description: 'Energizing blend of spearmint, eucalyptus, and citrus essential oils.',
    image: '/images/refreshing.jpg',
    price: '420 KES',
    ingredients: ['Coconut oil', 'Spearmint', 'Lemon zest', 'Eucalyptus'],
    badge: 'Bestseller',
  },
  {
    title: 'Turmeric Soap',
    description: 'Ancient healing power of turmeric. Brightens skin and reduces inflammation.',
    image: '/images/turmeric.jpg',
    price: '420 KES',
    ingredients: ['Turmeric', 'Raw honey', 'Goat milk', 'Chamomile'],
    badge: 'Premium',
  },
  {
    title: 'Detox Soap',
    description: 'Activated charcoal draws out impurities. Ideal for oily and acne-prone skin.',
    image: '/images/detox.jpg',
    price: '420 KES',
    ingredients: ['Charcoal', 'Bentonite clay', 'Tea tree', 'Rosemary'],
    badge: null,
  },
  {
    title: 'Exfoliant Soap',
    description: 'Ground oatmeal and coffee buff away dead skin while shea butter moisturizes.',
    image: '/images/exfoliant.jpg',
    price: '420 KES',
    ingredients: ['Oatmeal', 'Coffee', 'Shea butter', 'Vanilla'],
    badge: null,
  },
];

export function Products() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="products" className="py-24 bg-[#f5f0e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Our Signature Collection
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Four unique formulas, each designed for specific skin needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`group bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-text">{product.title}</h3>
                  <span className="text-secondary font-bold">{product.price}</span>
                </div>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="text-xs bg-background px-2 py-1 rounded-full text-text-muted">
                      {ing}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
