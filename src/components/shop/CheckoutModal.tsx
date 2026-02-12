import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { createOrderWithValidation, checkRateLimit } from '../../lib/supabase';
import { generatePublicRef } from '../../utils/hash';
import { sanitizePhone, sanitizeName, isValidPhone, isValidName } from '../../utils/security';
import { getClientIp } from '../../utils/ip';


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
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkRateLimitStatus();
    }
  }, [isOpen]);

  const checkRateLimitStatus = async () => {
    try {
      const ip = await getClientIp();
      const keyId = `ip:${ip}`;
      const { remaining } = await checkRateLimit(keyId, 5, 60);
      setRateLimitRemaining(remaining);
    } catch {
      setRateLimitRemaining(null);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sanitizedName = sanitizeName(name);
    const sanitizedPhone = sanitizePhone(phone);

    if (!isValidName(sanitizedName)) {
      setError('Please enter a valid name');
      return;
    }

    if (!isValidPhone(sanitizedPhone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    const ip = await getClientIp();
    const keyId = `ip:${ip}`;
    const { allowed, remaining, resetTime } = await checkRateLimit(keyId, 5, 60);

    if (!allowed) {
      setError(`Rate limit exceeded. Please try again after ${resetTime.toLocaleTimeString()}.`);
      setLoading(false);
      setRateLimitRemaining(0);
      return;
    }

    setRateLimitRemaining(remaining);

    const publicRef = generatePublicRef();
    const origin = window.location.origin;
    const invoiceUrl = `${origin}/invoice?ref=${publicRef}`;

    const { order: savedOrder, error: orderError } = await createOrderWithValidation(
      publicRef,
      sanitizedName,
      sanitizedPhone,
      items
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

See invoice ${invoiceUrl}`;

      window.open(`https://wa.me/254702255299?text=${encodeURIComponent(message)}`, '_blank');
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

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Checkout</h2>
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
          {rateLimitRemaining !== null && rateLimitRemaining <= 2 && rateLimitRemaining > 0 && (
            <div className="text-amber-600 text-sm">
              {rateLimitRemaining} order{rateLimitRemaining !== 1 ? 's' : ''} remaining this hour
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
              placeholder="John Doe"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
              placeholder="0712 345 678"
              maxLength={20}
            />
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
