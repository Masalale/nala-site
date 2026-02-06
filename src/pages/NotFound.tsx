import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function NotFound() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-primary/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-24 right-12 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="block text-[10rem] sm:text-[14rem] font-heading font-bold leading-none text-primary/15 select-none">
            404
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text mb-4 leading-tight">
          This path leads{' '}
          <span className="text-secondary">back to nature</span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for has dissolved like soap bubbles. Let's guide you back to smoother ground.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="lg">
              Browse Soaps
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-text-muted/40">
          <div className="w-12 h-px bg-accent/20" />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
          <div className="w-12 h-px bg-accent/20" />
        </div>
      </div>
    </section>
  );
}
