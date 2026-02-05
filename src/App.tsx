import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustBadges } from './components/sections/TrustBadges';
import { Benefits } from './components/sections/Benefits';
import { Products } from './components/sections/Products';
import { Bundles } from './components/sections/Bundles';
import { Story } from './components/sections/Story';
import { Testimonials } from './components/sections/Testimonials';
import { Process } from './components/sections/Process';
import { CTABanner } from './components/sections/CTABanner';
import { FAQ } from './components/sections/FAQ';
import { Newsletter } from './components/sections/Newsletter';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Benefits />
        <Products />
        <Bundles />
        <Story />
        <Testimonials />
        <Process />
        <CTABanner />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
