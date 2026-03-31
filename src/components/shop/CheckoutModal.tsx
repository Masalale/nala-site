import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { createOrderWithValidation } from '../../lib/convex';
import { generatePublicRef, generateViewToken } from '../../utils/hash';
import { sanitizePhone, sanitizeName, isValidPhone, isValidName } from '../../utils/security';


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sanitizedName = sanitizeName(name);
    const sanitizedPhone = sanitizePhone(phone);

    if (!isValidName(sanitizedName)) {
      setError('Please enter your full name (at least two names, letters only)');
      return;
    }

    if (!isValidPhone(sanitizedPhone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    const publicRef = generatePublicRef();
    const viewToken = generateViewToken();
    const origin = window.location.origin;
    const invoiceUrl = `${origin}/invoice?ref=${publicRef}&token=${viewToken}`;

    const { order: savedOrder, error: orderError } = await createOrderWithValidation(
      publicRef,
      viewToken,
      sanitizedName,
      sanitizedPhone,
      items,
      invoiceUrl
    );

    if (savedOrder) {
      // Format items string
      const itemsList = items.map(item =>
        `*${item.quantity}x* ${item.title} KES ${item.price.toLocaleString()}`
      ).join('\n');

      // Construct the exact message pattern requested
      const message = `Hi Nala! 
I'd like to place an order.

*#${publicRef}* 

${itemsList}

Item total: KES ${savedOrder.total.toLocaleString()} (Qty: ${items.reduce((acc, item) => acc + item.quantity, 0)})
*Total : KES ${savedOrder.total.toLocaleString()}*

Customer: *${sanitizedName}* ${sanitizedPhone} 

See Invoice: ${invoiceUrl}`;

      const waWindow = window.open(`https://wa.me/254755579234?text=${encodeURIComponent(message)}`, '_blank');
      if (!waWindow) {
        // Popup blocked — fallback to direct navigation
        window.location.href = `https://wa.me/254755579234?text=${encodeURIComponent(message)}`;
      }
      clearCart();
      onClose();
    } else {
      setError(orderError || 'Failed to place order. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 id="checkout-title" className="text-xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#da924b] text-[#3d5a3c] hover:brightness-110 transition-colors shadow-sm"
            aria-label="Close checkout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              id="checkout-name"
              type="text"
              required
              value={name}
              onChange={e => {
                const val = e.target.value;
                // Allow only letters, spaces, and specific punctuation
                if (/^[a-zA-Z\s'.-]*$/.test(val)) {
                  setName(val);
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
              placeholder="John Doe"
              maxLength={50}
            />
            <p className="text-xs text-text-muted mt-1">First and Last name required (no numbers)</p>
          </div>

          <div>
            <label htmlFor="checkout-phone" className="block text-sm font-medium mb-1">Whatsapp Number *</label>
            <input
              id="checkout-phone"
              type="tel"
              required
              value={phone}
              onChange={e => {
                const val = e.target.value;
                // Allow digits and leading + only
                if (/^\+?[\d]*$/.test(val)) {
                  setPhone(val);
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
              placeholder="0712 345 678"
              maxLength={13}
            />
            <p className="text-xs text-text-muted mt-1">Format: 07..., 01..., 254...</p>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
