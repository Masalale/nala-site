import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { CartProvider } from './context/CartContext';

import { SmoothScroll } from './components/utils/SmoothScroll';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const Invoice = lazy(() => import('./pages/Invoice').then(m => ({ default: m.Invoice })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <CartProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          {/* Invoice Route - completely standalone (no navbar/footer/smoothscroll) */}
          <Route path="/invoice" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Invoice />
            </Suspense>
          } />

          {/* Main Site Layout */}
          <Route path="*" element={
            <>
              <SmoothScroll />
              <ScrollToTop />
              <Navbar />
              <main>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
