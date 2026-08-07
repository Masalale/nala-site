import { useEffect, useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
    rawCartTotal,
    soapDiscount,
    maxStockMessage,
    clearMaxStockMessage
  } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isCartOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsCartOpen(false); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    drawer.addEventListener('keydown', handleTab);
    return () => drawer.removeEventListener('keydown', handleTab);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const soapItems = items.filter(i => i.category === 'soap');
  const totalSoapQty = soapItems.reduce((acc, i) => acc + i.quantity, 0);
  const needsOneMoreForOffer = totalSoapQty % 2 === 1;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />

        <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Shopping cart" className="relative z-10 w-full md:max-w-md bg-white shadow-xl flex flex-col h-full">
          <div className="p-6 border-b flex justify-between items-center bg-surface/50">
            <div>
              <h2 className="text-xl font-bold">Your Cart ({items.length})</h2>
              <p className="text-xs text-text-muted">Offer: 2 Soaps for KES 500/=</p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#da924b] text-[#3d5a3c] hover:brightness-110 transition-colors shadow-sm"
              aria-label="Close cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {maxStockMessage && (
            <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex justify-between items-center">
              <span>{maxStockMessage}</span>
              <button onClick={clearMaxStockMessage} className="font-bold text-amber-700 uppercase">Dismiss</button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-text font-medium text-lg">Your cart is empty</p>
                <Button variant="secondary" size="md" onClick={() => setIsCartOpen(false)} className="mt-4">
                  Start Shopping
                </Button>
              </div>
            ) : (
              <>
                {needsOneMoreForOffer && (
                  <div className="p-3 rounded-xl bg-[#701a2e]/10 border border-[#701a2e]/20 text-[#701a2e] text-xs font-medium flex items-center gap-2">
                    <span>Add 1 more soap to get 2 for 500/=!</span>
                  </div>
                )}

                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-surface rounded-2xl border border-black/5">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium ml-2" aria-label={`Remove ${item.title} from cart`}>Delete</button>
                      </div>
                      <p className="text-secondary font-bold text-sm mt-0.5">KES {item.price.toLocaleString()}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold" aria-label={`Decrease ${item.title} quantity`}>-</button>
                          <span className="px-3 text-xs font-bold text-text">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold" aria-label={`Increase ${item.title} quantity`}>+</button>
                        </div>
                        <span className="text-xs font-semibold text-text">KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-surface/30 space-y-3">
              {soapDiscount > 0 && (
                <div className="space-y-1 text-sm border-b pb-3">
                  <div className="flex justify-between text-text-muted">
                    <span>Items Total</span>
                    <span>KES {rawCartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#701a2e] font-semibold">
                    <span>2-Soap Offer Savings</span>
                    <span>- KES {soapDiscount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-secondary">KES {cartTotal.toLocaleString()}</span>
              </div>

              <Button variant="primary" size="lg" className="w-full shadow-md" onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
