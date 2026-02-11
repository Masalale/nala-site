import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Sourcing',
    description: 'We carefully select organic, sustainably-sourced ingredients from trusted local suppliers.',
  },
  {
    number: '02',
    title: 'Crafting',
    description: 'Each batch is hand-mixed and poured using traditional cold-process methods.',
  },
  {
    number: '03',
    title: 'Curing',
    description: 'Bars cure for 4-6 weeks to create a hard, long-lasting soap with rich lather.',
  },
  {
    number: '04',
    title: 'Packaging',
    description: 'Wrapped in eco-friendly materials and shipped plastic-free to your door.',
  },
];

export function Process() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" className="py-12 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-text mb-3 md:mb-4">
            From Nature to Your Skin
          </h2>
          <p className="text-base md:text-lg text-text-muted">
            Our traditional cold-process method
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -translate-y-1/2" />

          {/* Steps Grid - 2x2 on Mobile, 4x1 on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative group bg-background/40 backdrop-blur-sm border border-secondary/10 p-6 rounded-2xl md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:rounded-none text-left md:text-center transition-all duration-500 hover:border-secondary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >


                {/* Step Circle */}
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 mb-4 md:mx-auto md:mb-6 bg-background md:bg-background border border-primary/20 md:border-2 rounded-full flex items-center justify-center shadow-sm md:shadow-lg group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  <span className="text-secondary font-heading font-bold text-lg md:text-xl group-hover:text-primary transition-colors">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-lg md:text-xl font-semibold text-text mb-2 md:mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="relative z-10 text-sm md:text-base text-text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
