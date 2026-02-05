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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            From Nature to Your Skin
          </h2>
          <p className="text-lg text-text-muted">
            Our traditional cold-process method
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Aligned with circles */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative group text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-surface border-2 border-primary/20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  <span className="text-secondary font-heading font-bold text-xl group-hover:text-primary transition-colors">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm lg:text-base px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
