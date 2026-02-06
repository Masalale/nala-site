import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ScrollToTop } from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SpeedInsights />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
