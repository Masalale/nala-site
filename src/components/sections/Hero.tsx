import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-[#f5f0e6]">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6">
            Pure Ingredients.{' '}
            <span className="text-secondary">Pure Clean.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
            Handcrafted soaps made with organic botanicals. No parabens, no sulfates, just nature's best for your skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="primary" size="lg">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[3/4] max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-3xl blur-2xl" />
            <video
              src="/images/video_02_av1.webm"
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#benefits" className="text-text-muted hover:text-secondary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
