import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function Sustainability() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={ref}
                    className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div>
                        <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
                            Sustainability Statement
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-text mb-8">
                            Thoughtful Production, <br />
                            <span className="text-secondary">Respectful Results.</span>
                        </h2>
                    </div>

                    <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-secondary/10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                        <p className="text-xl text-text leading-relaxed font-medium mb-6">
                            Nature’s Lather values thoughtful production.
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            We focus on small batches, minimal waste, and formulas that rely on fewer, better ingredients. Sustainability to us means making products that last, perform well, and respect both skin and resources.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
