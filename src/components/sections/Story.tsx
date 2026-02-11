import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

export function Story() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="story" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              Our Story: <span className="text-secondary">From Kitchen to Craft</span>
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Nature’s Lather began with a simple question: What if soap actually respected the skin?
              </p>
              <p>
                Tired of harsh, over-processed products, we started experimenting with traditional soap-making methods and natural ingredients known for their real benefits. Tallow, plant oils, clays, oats—ingredients used for generations, chosen for a reason.
              </p>
              <p>
                Each bar is made in small batches, cured patiently, and formulated to serve a purpose—whether that’s calming sensitive skin, cleansing deeply, or restoring balance.
              </p>
              <p className="font-medium text-text italic">
                Nature’s Lather isn’t about trends. It’s about returning to what works and doing it well.
              </p>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link to="/shop">
                <Button variant="secondary" size="lg">
                  Shop Our Collection
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative w-full flex justify-center lg:block">
            <div className="relative w-[73%] lg:w-full max-w-md mx-auto aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl blur-2xl" />
              <video
                poster="/images/story_soap_poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              >
                <source src="/videos/story_soap_av1.webm" type="video/webm" />
                <source src="/videos/story_soap.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
