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
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              Our Story: <span className="text-secondary">From Kitchen to Craft</span>
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Hey there, soap lovers! As Nature's Lather, we are dedicated to
                turning your shower time into a mini Kenyan paradise.
              </p>
              <p>
                Our organic soaps are like a mini safari for your skin! We're
                committed to using natural, organic ingredients because we believe
                that what's good for the earth is good for your skin.
              </p>
              <p className="font-medium text-text">
                Every bar is still made by hand, in small batches, with ingredients we'd proudly display on our own bathroom shelves.
              </p>
            </div>
            <div className="mt-8">
              <Button variant="secondary" size="lg">
                Shop Our Collection
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl blur-2xl" />
            <video
              src="/images/video_01_av1.webm"
              autoPlay
              loop
              muted
              playsInline
              className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
