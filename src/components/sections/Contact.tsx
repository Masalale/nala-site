import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >


          {submitted ? (
            <div className="text-center bg-secondary/10 p-6 md:p-8 rounded-3xl">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-text mb-2">Message Sent!</h3>
              <p className="text-text-muted">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="grid gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254"
                    required
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    maxLength={1000}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none text-base"
                  />
                </div>

                <Button type="submit" variant="secondary" size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-text-muted mb-2">Or reach us directly on WhatsApp</p>
            <a
              href="https://wa.me/25475579234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors p-2"
            >
              <span>💬</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
