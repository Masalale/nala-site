import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-surface">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-text mb-4">
          Join the NALA Community
        </h3>
        <p className="text-text-muted mb-8">
          Get skincare tips, new product alerts, and 50/- off your first order
        </p>

        {submitted ? (
          <div className="bg-secondary/10 text-secondary p-4 rounded-full font-medium">
            Thank you for subscribing! Check your email for your discount code.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-secondary/30 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              required
            />
            <Button type="submit" variant="secondary" size="md">
              Subscribe
            </Button>
          </form>
        )}

        <p className="text-xs text-text-muted mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
