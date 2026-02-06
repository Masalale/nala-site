import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const testimonials = [
  {
    quote: "Finally found a soap that doesn't trigger my eczema! The oatmeal exfoliant is incredibly gentle and my skin has never felt softer.",
    author: 'Sarah M.',
    role: 'Teacher & Mom of Two',
    location: 'Karen, Nairobi',
  },
  {
    quote: "The turmeric soap has done wonders for my acne scars. Natural products that actually work? NALA is the real deal!",
    author: 'James K.',
    role: 'Marketing Executive',
    location: 'Westlands, Nairobi',
  },
  {
    quote: "As someone with extremely sensitive skin, NALA is the first 'natural' soap that actually delivers. No irritation, just clean, happy skin.",
    author: 'Maria L.',
    role: 'Nurse',
    location: 'Mombasa',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-16">
            What Our Community Says
          </h2>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="text-6xl text-primary/30 absolute -top-8 left-0">"</div>

            <div className="min-h-[200px] flex items-center justify-center">
              <blockquote className="text-xl sm:text-2xl text-text leading-relaxed max-w-3xl">
                {testimonials[activeIndex].quote}
              </blockquote>
            </div>

            <div className="mt-8">
              <p className="font-semibold text-text text-lg">{testimonials[activeIndex].author}</p>
              <p className="text-text-muted">{testimonials[activeIndex].role}</p>
              <p className="text-text-muted text-sm">{testimonials[activeIndex].location}</p>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                    ? 'bg-secondary w-8'
                    : 'bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
