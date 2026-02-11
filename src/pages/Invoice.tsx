import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderByRef } from '../lib/supabase';
import type { Order } from '../types/shop';
import { Button } from '../components/ui/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export function Invoice() {
  const [searchParams] = useSearchParams();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

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

  // ... (imports remain the same, just adding toast)

  const handleDownload = async (format: 'pdf' | 'image') => {
    if (!invoiceRef.current) return;
    setGeneratingPdf(true);

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY, // Fix for scroll issue
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      });

      const imgData = canvas.toDataURL('image/png');

      if (format === 'image') {
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `Invoice_${order?.public_ref}.png`;
        link.click();
      } else {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Invoice_${order?.public_ref}.pdf`);
      }

      toast.success(`Invoice downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      console.error('Error creating file:', err);
      toast.error('Failed to generate invoice file');
    } finally {
      setGeneratingPdf(false);
      setShowDownloadOptions(false);
    }
  };

  const handleOrderAgain = () => {
    if (order) {
      const url = `${window.location.origin}/shop?reorder=${order.public_ref}`;
      window.open(url, '_blank');
    }
  };

  const handleEmailInvoice = () => {
    toast.info('Email feature coming soon!', {
      description: 'We won\'t charge you for this update 😉'
    });
  };

  // Date formatter
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // "11th Feb 2026, 14:30"
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][((day % 100) > 10 && (day % 100) < 20) ? 0 : (day % 10) < 4 ? day % 10 : 0];
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return `${day}${suffix} ${month} ${year}, ${time}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:bg-white print:p-0" onClick={() => setShowDownloadOptions(false)}>
      {/* Action Bar (Hidden in Print/PDF) */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Link to="/" className="flex items-center text-text-muted hover:text-primary transition-colors gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </Link>

        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="p-2 text-text-muted hover:text-primary transition-colors rounded-full hover:bg-white/50"
            title="Print Invoice"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>

          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              disabled={generatingPdf}
              className="p-2 text-text-muted hover:text-primary transition-colors rounded-full hover:bg-white/50 disabled:opacity-50"
              title="Download"
            >
              {generatingPdf ? (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>

            {showDownloadOptions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download as PDF
                </button>
                <button
                  onClick={() => handleDownload('image')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Download as Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div ref={invoiceRef} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 print:shadow-none print:w-full print:max-w-none">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text">Nature's Lather</h1>
            <p className="text-text-muted">Nairobi, Kenya</p>
            <p className="text-text-muted">+254 702 255299</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-secondary/20 mb-1">INVOICE</h2>
            <p className="font-mono text-lg text-text-muted">No : {order.public_ref}</p>
            <p className="text-sm text-text-muted mt-1">{formatDate(order.created_at)}</p>
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

        <div className="bg-surface/50 rounded-xl p-6 flex justify-between items-center print:bg-gray-50">
          <div>
            <h4 className="font-bold">Payment Details</h4>
            <p className="text-sm text-text-muted">Complete payment via M-Pesa</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted uppercase">Pochi la Biashara</p>
            <p className="font-mono text-xl font-bold text-secondary">+254 702 255299</p>
          </div>
        </div>

        {/* Action Buttons (Hidden in Print/PDF) */}
        <div className="mt-8 grid grid-cols-2 gap-4 print:hidden" data-html2canvas-ignore>
          <Button variant="outline" onClick={handleEmailInvoice} className="w-full">
            Email Invoice
          </Button>
          <Button variant="primary" onClick={handleOrderAgain} className="w-full">
            Order Again
          </Button>
        </div>
      </div>
    </div>
  );
}
