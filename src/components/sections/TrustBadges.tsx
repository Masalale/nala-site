import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const badges = [
  { text: '100% Natural', icon: '🌿' },
  { text: 'Handcrafted', icon: '✋' },
  { text: 'Paraben-Free', icon: '🛡️' },
  { text: 'Made in Kenya', icon: '📍' },
  { text: 'Eco-Friendly', icon: '♻️' },
];

export function TrustBadges() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-8 bg-surface border-y border-secondary/10">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {badges.map((badge, index) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-text-muted hover:text-secondary transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
