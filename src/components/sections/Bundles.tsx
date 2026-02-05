import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';

const bundles = [
  {
    name: 'Starter Set',
    price: '1,200 KES',
    period: '2 bars',
    description: 'Mix & match any 2 soaps',
    features: ['Choose any 2 varieties', 'Save 100-200 KES', 'Perfect for trying NALA'],
    highlighted: false,
  },
  {
    name: 'Complete Collection',
    price: '2,400 KES',
    period: 'All 4 bars',
    description: 'One of each variety',
    features: ['All 4 signature soaps', 'Save 350 KES', 'FREE SHIPPING', 'Best value'],
    highlighted: true,
  },
  {
    name: 'Family Pack',
    price: '3,400 KES',
    period: '6 bars',
    description: 'Stock up & share',
    features: ['6 bars of your choice', 'Save 500 KES', 'FREE SHIPPING', 'Great for gifting'],
    highlighted: false,
  },
];

export function Bundles() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Save More with Bundles
          </h2>
          <p className="text-lg text-text-muted">
            Free shipping on orders over 2,000 KES
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {bundles.map((bundle, index) => (
            <div
              key={bundle.name}
              className={`relative bg-surface rounded-3xl p-8 transition-all duration-500 ${
                bundle.highlighted 
                  ? 'ring-2 ring-primary shadow-xl scale-105' 
                  : 'shadow-sm hover:shadow-lg'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {bundle.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-text text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-text mb-2">{bundle.name}</h3>
                <div className="text-4xl font-bold text-secondary mb-1">{bundle.price}</div>
                <p className="text-sm text-text-muted">{bundle.period}</p>
              </div>
              <p className="text-center text-text-muted mb-6">{bundle.description}</p>
              <ul className="space-y-3 mb-8">
                {bundle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-text">
                    <span className="text-secondary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant={bundle.highlighted ? 'primary' : 'outline'} 
                size="md" 
                className="w-full"
              >
                {bundle.highlighted ? 'Get Complete Set' : 'Select Bundle'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
