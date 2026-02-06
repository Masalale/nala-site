import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const faqs = [
  {
    question: 'How long does a bar last?',
    answer: 'With proper care (keeping it dry between uses), each bar lasts 4-6 weeks with daily use. Using a soap dish with drainage helps extend the life of your soap.',
  },
  {
    question: 'Are your soaps suitable for sensitive skin?',
    answer: "Absolutely! Our soaps are pH-balanced with natural glycerin retained. We use no synthetic fragrances or harsh chemicals. The Exfoliant soap with oatmeal is particularly gentle.",
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa and Bank transfers only.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Nairobi: Same-day or next-day. Major towns (Mombasa, Kisumu, Nakuru): 2-3 days. Other locations: 3-5 days via courier.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-secondary/20 rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-background hover:bg-primary/5 transition-colors"
              >
                <span className="font-semibold text-text pr-4">{faq.question}</span>
                <span className={`text-secondary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                  }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                <p className="p-6 pt-0 text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
