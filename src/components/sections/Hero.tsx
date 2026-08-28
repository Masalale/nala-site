import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface MediaSource {
  src: string;
  type: string;
}

interface MediaItem {
  type: 'video' | 'image';
  sources?: MediaSource[];
  src?: string;
  poster?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const mediaItems: MediaItem[] = [
  {
    type: 'image',
    src: '/images/gentle_red_valentines.webp',
    alt: "Valentine's Day Special - Gentle Red Soap",
    className: 'object-cover object-center w-full',
    style: { height: '115%', marginTop: '-18%' }
  },
  {
    type: 'video',
    sources: [
      { src: '/videos/model_av1.webm', type: 'video/webm' },
      { src: '/videos/model.mp4', type: 'video/mp4' }
    ],
    poster: '/images/model_poster.webp',
    alt: "Model using Nature's Lather soap"
  },
  {
    type: 'video',
    sources: [
      { src: '/videos/intro_av1.webm', type: 'video/webm' },
      { src: '/videos/intro.mp4', type: 'video/mp4' }
    ],
    poster: '/images/intro_poster.webp',
    alt: "Introduction to Nature's Lather products",
    className: 'object-bottom'
  },
  {
    type: 'image',
    src: '/images/collection.webp',
    alt: "Full collection of Nature's Lather soaps",
    className: 'object-cover object-center w-full',
    style: { height: '115%', marginTop: '-18%' }
  },
  {
    type: 'image',
    src: '/images/stamp.webp',
    alt: "Nature's Lather soap with embossed stamp",
    className: 'object-cover object-center w-full',
    style: { height: '115%', marginTop: '-7.5%' }
  },
];

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaItems.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % mediaItems.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      }
    }
  };

  const getCardStyle = (index: number) => {
    const length = mediaItems.length;
    const offset = (index - activeIndex + length) % length;
    const transformOrigin = 'bottom center';

    const xStep = isMobile ? 15 : 60;
    const rStep = isMobile ? 3 : 8;
    const startOffset = isMobile ? -35 : 0;

    if (offset === 0) {
      return {
        zIndex: 50,
        opacity: 1,
        transform: `translateX(${startOffset}px) rotate(0deg) scale(1)`,
        transformOrigin,
        filter: 'brightness(1.1)',
        pointerEvents: 'auto' as const,
        transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
      } as React.CSSProperties;
    }
    if (offset <= 3) {
      const rotate = offset * rStep;
      const tx = startOffset + (offset * xStep);
      const scale = 1 - (offset * 0.05);
      return {
        zIndex: 50 - offset,
        opacity: 1 - (offset * 0.15),
        transform: `translateX(${tx}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin,
        filter: `blur(${offset * 1}px) brightness(${1 - offset * 0.1})`,
        pointerEvents: 'none' as const,
        transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
      } as React.CSSProperties;
    }
    return {
      zIndex: 0,
      opacity: 0,
      transform: 'translateX(50px) rotate(10deg) scale(0.5)',
      transformOrigin,
      filter: '',
      pointerEvents: 'none' as const,
      transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
    } as React.CSSProperties;
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16 md:pt-56 md:pb-24 lg:pt-64 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="text-center lg:text-left z-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6">
            From Nature.{' '}
            <br />
            <span className="text-secondary">For Skin.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
            Soap, the way nature intended.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Shop Collection
              </Button>
            </Link>
            <Link to="/#story">
              <Button variant="outline" size="lg">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="relative h-[450px] lg:h-[600px] flex items-center justify-center lg:justify-center"
          style={{ perspective: '2000px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-md aspect-[4/5]">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="absolute inset-0 w-full h-full"
                style={getCardStyle(index)}
              >
                <div className="w-full h-full bg-surface-muted rounded-3xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.35)] border border-white/20 relative group">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none" />

                  {item.type === 'video' ? (
                    <video
                      ref={(el) => { if (el) videoRefs.current[index] = el; }}
                      poster={item.poster}
                      className={`w-full h-full object-cover ${item.className || ''}`}
                      style={item.style}
                      muted
                      playsInline
                      loop
                    >
                      {item.sources?.map((source, idx) => (
                        <source key={idx} src={source.src} type={source.type} />
                      ))}
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-full object-cover ${item.className || ''}`}
                      style={item.style}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === activeIndex
                    ? 'w-8 bg-secondary shadow-[0_0_10px_rgba(214,135,57,0.5)]'
                    : 'w-2 bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
