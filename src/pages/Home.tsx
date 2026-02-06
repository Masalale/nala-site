import { Hero } from '../components/sections/Hero';
import { TrustBadges } from '../components/sections/TrustBadges';
import { Benefits } from '../components/sections/Benefits';
import { Story } from '../components/sections/Story';
import { Testimonials } from '../components/sections/Testimonials';
import { Process } from '../components/sections/Process';
import { Sustainability } from '../components/sections/Sustainability';
import { CTABanner } from '../components/sections/CTABanner';
import { FAQ } from '../components/sections/FAQ';
import { Newsletter } from '../components/sections/Newsletter';
import { Contact } from '../components/sections/Contact';

export function Home() {
    return (
        <>
            <Hero />
            <TrustBadges />
            <Benefits />
            <Story />
            <Testimonials />
            <Process />
            <Sustainability />
            <CTABanner />
            <Newsletter />
            <Contact />
            <FAQ />
        </>
    );
}
