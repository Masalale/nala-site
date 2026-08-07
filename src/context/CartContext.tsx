import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types/shop';

const DEFAULT_STOCKS: Record<string, number> = { detox: 3, refreshing: 3, 'gentle-red': 7 };

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  stocks: Record<string, number>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  deductStock: (purchasedItems: CartItem[]) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  rawCartTotal: number;
  soapDiscount: number;
  itemCount: number;
  maxStockMessage: string | null;
  clearMaxStockMessage: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [maxStockMessage, setMaxStockMessage] = useState<string | null>(null);
  const [stocks, setStocks] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('nala_dynamic_stocks');
      return saved ? JSON.parse(saved) : DEFAULT_STOCKS;
    } catch {
      return DEFAULT_STOCKS;
    }
  });

  const getStockLimit = (product: Product | CartItem): number =>
    stocks[product.id] ?? product.stock ?? DEFAULT_STOCKS[product.id] ?? (product.soldOut ? 0 : 99);

  const deductStock = (purchasedItems: CartItem[]) => {
    setStocks(current => {
      const updated = { ...current };
      purchasedItems.forEach(item => {
        const cur = updated[item.id] ?? DEFAULT_STOCKS[item.id] ?? 0;
        updated[item.id] = Math.max(0, cur - item.quantity);
      });
      try {
        localStorage.setItem('nala_dynamic_stocks', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist stocks:', err);
      }
      return updated;
    });
  };

  const addToCart = (product: Product, quantity = 1) => {
    const stockLimit = getStockLimit(product);
    if (stockLimit <= 0) return setMaxStockMessage(`${product.title} is currently sold out.`);

    setItems(current => {
      const existing = current.find(i => i.id === product.id);
      const targetQty = (existing?.quantity ?? 0) + quantity;

      if (targetQty > stockLimit) {
        setMaxStockMessage(`Only ${stockLimit} ${product.title} bar${stockLimit > 1 ? 's' : ''} available in stock.`);
        return existing
          ? current.map(i => i.id === product.id ? { ...i, quantity: stockLimit } : i)
          : [...current, { ...product, quantity: stockLimit, stock: stockLimit }];
      }

      setMaxStockMessage(null);
      return existing
        ? current.map(i => i.id === product.id ? { ...i, quantity: targetQty, stock: stockLimit } : i)
        : [...current, { ...product, quantity, stock: stockLimit }];
    });
  };

  const removeFromCart = (productId: string) => setItems(c => c.filter(i => i.id !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);

    setItems(current => {
      const target = current.find(i => i.id === productId);
      if (!target) return current;

      const limit = getStockLimit(target);
      if (quantity > limit) {
        setMaxStockMessage(`Only ${limit} ${target.title} bar${limit > 1 ? 's' : ''} available in stock.`);
        return current.map(i => i.id === productId ? { ...i, quantity: limit } : i);
      }

      setMaxStockMessage(null);
      return current.map(i => i.id === productId ? { ...i, quantity } : i);
    });
  };

  const clearCart = () => setItems([]);
  const clearMaxStockMessage = () => setMaxStockMessage(null);

  // 2-for-500 KES offer calculations for soaps
  const soapItems = items.filter(i => i.category === 'soap');
  const totalSoapQty = soapItems.reduce((acc, i) => acc + i.quantity, 0);
  const rawSoapTotal = soapItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountedSoapTotal = Math.floor(totalSoapQty / 2) * 500 + (totalSoapQty % 2) * 420;
  const soapDiscount = Math.max(0, rawSoapTotal - discountedSoapTotal);
  const nonSoapTotal = items.filter(i => i.category !== 'soap').reduce((sum, i) => sum + i.price * i.quantity, 0);

  const rawCartTotal = rawSoapTotal + nonSoapTotal;
  const cartTotal = discountedSoapTotal + nonSoapTotal;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isCartOpen, stocks, addToCart, removeFromCart, updateQuantity,
      clearCart, deductStock, setIsCartOpen, cartTotal, rawCartTotal,
      soapDiscount, itemCount, maxStockMessage, clearMaxStockMessage,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
