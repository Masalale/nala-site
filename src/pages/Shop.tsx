import { Products } from '../components/sections/Products';
import { CartDrawer } from '../components/shop/CartDrawer';
import { useCart } from '../context/CartContext';

export function Shop() {
    const { setIsCartOpen, itemCount } = useCart();

    return (
        <div className="pt-32">
            <CartDrawer />
            <Products />
            
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-8 z-40 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary/90 transition-all"
            >
                <div className="relative">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-text text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </div>
            </button>

            {/* Ingredients & Philosophy Section */}
            <section className="py-24 bg-background border-t border-secondary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
                                Ingredients & Philosophy
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-8">
                                What Goes On Your Skin Matters
                            </h2>

                            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                                <p>
                                    Your skin absorbs more than you think. That’s why we choose ingredients that are functional, familiar, and proven.
                                </p>
                                <p>
                                    We believe in transparency. Every ingredient has a role. Nothing is added just for appearance or marketing appeal.
                                </p>
                            </div>
                        </div>

                        <div className="bg-surface p-8 sm:p-12 rounded-3xl shadow-sm border border-secondary/5">
                            <h4 className="font-bold text-text text-xl mb-6 border-b border-secondary/10 pb-4">Our Approach</h4>
                            <ul className="space-y-6">
                                {[
                                    { title: 'Traditional Methods', desc: 'Saponification techniques that preserve natural glycerin.' },
                                    { title: 'Balanced Formulas', desc: 'pH-conscious recipes designed for daily use.' },
                                    { title: 'Performance First', desc: 'Every ingredient is chosen for its skin benefit, not hype.' }
                                ].map((item) => (
                                    <li key={item.title} className="flex gap-4">
                                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2" />
                                        <div>
                                            <span className="block font-semibold text-text">{item.title}</span>
                                            <span className="text-sm text-text-muted">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
