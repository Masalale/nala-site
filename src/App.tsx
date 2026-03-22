import { lazy, Suspense, Component } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { CartProvider } from './context/CartContext';

import { SmoothScroll } from './components/utils/SmoothScroll';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const Invoice = lazy(() => import('./pages/Invoice').then(m => ({ default: m.Invoice })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

import { Toaster } from 'sonner';

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
