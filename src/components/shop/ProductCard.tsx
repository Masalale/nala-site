import type { Product } from '../../types/shop';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-text uppercase">
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-text mb-2">{product.title}</h3>
        <p className="text-text-muted text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">KES {product.price.toLocaleString()}</span>
          <Button variant="outline" size="sm" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
