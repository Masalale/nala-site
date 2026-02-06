import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const benefits = [
  {
    title: '100% Organic Ingredients',
    description: 'Every bar is crafted using certified organic oils, butters, and botanicals sourced from local farms.',
    icon: '🌿',
  },
  {
    title: 'Completely Paraben-Free',
    description: 'Zero parabens, zero sulfates, zero synthetic fragrances. Only natural preservatives.',
    icon: '🛡️',
  },
  {
    title: 'Handcrafted in Small Batches',
    description: 'Traditional cold-process methods in micro-batches of 20 bars for superior quality.',
    icon: '✨',
  },
  {
    title: 'Eco-Conscious Packaging',
    description: '100% plastic-free, biodegradable packaging made from recycled materials.',
    icon: '♻️',
  },
  {
    title: 'Skin‑focused formulas',
    description: 'Each bar is designed around real skin needs — not trends.',
    icon: '💚',
  },
  {
    title: 'Proudly Kenyan',
    description: 'Handcrafted in Nairobi with locally-sourced ingredients. Supporting local artisans.',
    icon: '📍',
  },
];

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Why Choose <span className="text-secondary">NALA</span>?
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Every bar is crafted with intention, care, and the finest organic ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group bg-surface p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">{benefit.title}</h3>
              <p className="text-text-muted leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
