import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

export function CTABanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-24 bg-gradient-to-br from-secondary to-primary transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Make the Switch to Natural?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join hundreds of Kenyans who've discovered the NALA difference. Free delivery on orders over 3,000 KES!
        </p>
        <Link to="/shop">
          <Button
            variant="primary"
            size="lg"
            className="shadow-xl hover:shadow-2xl"
          >
            Shop Collection
          </Button>
        </Link>
      </div>
    </section>
  );
}
