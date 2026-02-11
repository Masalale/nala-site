import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrderByRef } from '../lib/supabase';
import type { Order } from '../types/shop';
import { Button } from '../components/ui/Button';

export function Invoice() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ref = searchParams.get('ref');

  useEffect(() => {
    if (!ref) {
      setError('Invalid order reference');
      setLoading(false);
      return;
    }

    if (ref.length !== 8) {
      setError('Invalid order reference');
      setLoading(false);
      return;
    }

    getOrderByRef(ref).then((data: Order | null) => {
      setOrder(data);
      setLoading(false);
      if (!data) setError('Order not found');
    });
  }, [ref]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:bg-white">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 print:shadow-none">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text">Nature's Lather</h1>
            <p className="text-text-muted">Nairobi, Kenya</p>
            <p className="text-text-muted">+254 702 255299</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-secondary/20">INVOICE</h2>
            <p className="font-mono">{order.public_ref}</p>
            <p className="text-sm text-text-muted">{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-text-muted uppercase mb-2">Bill To</h3>
          <p className="font-bold text-lg">{order.customer_name}</p>
          <p className="text-text-muted">{order.customer_phone}</p>
        </div>

        <table className="w-full mb-8">
          <thead className="border-b-2">
            <tr>
              <th className="text-left py-2">Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3">{item.title}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">KES {item.price.toLocaleString()}</td>
                <td className="text-right font-medium">KES {(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2">
              <td colSpan={3} className="pt-4 text-right text-lg font-bold">Total</td>
              <td className="pt-4 text-right text-lg font-bold text-secondary">KES {order.total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        <div className="bg-surface/50 rounded-xl p-6 flex justify-between items-center">
          <div>
            <h4 className="font-bold">Payment Details</h4>
            <p className="text-sm text-text-muted">Complete payment via M-Pesa</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted uppercase">Pochi la Biashara</p>
            <p className="font-mono text-xl font-bold text-secondary">+254 702 255299</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-text-muted print:hidden">
          <Button variant="outline" onClick={() => window.print()}>Print / Save PDF</Button>
        </div>
      </div>
    </div>
  );
}
