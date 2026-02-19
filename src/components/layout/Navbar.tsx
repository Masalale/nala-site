import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { lenisRef } from '../utils/SmoothScroll';




export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncs UI state with route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  // Nav items ordered to match page section flow
  const navItems = [
    { label: 'Why NALA', href: '/#benefits' },
    { label: 'Shop', href: '/shop' },
    { label: 'Our Story', href: '/#story' },
    { label: 'Connect', href: '#footer-connect' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '/' && location.pathname === '/') {
      lenisRef.current?.scrollTo(0);
    } else if (href.startsWith('#')) {
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        lenisRef.current?.scrollTo(element);
      }
    } else if (href.startsWith('/#') && location.pathname === '/') {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        lenisRef.current?.scrollTo(element);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Valentine's Announcement Bar */}
      {/* <Link
        to="/shop"
        className="relative bg-[#701a2e] text-[#fff1f2] h-11 flex items-center overflow-hidden hover:bg-[#831c35] transition-colors z-[51] shadow-md border-b border-white/5"
      >
        <div className="absolute flex items-center animate-marquee whitespace-nowrap min-w-full">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="mx-6 text-[13px] font-medium tracking-wide flex items-center gap-3">
              <span className="font-bold tracking-widest text-white uppercase bg-white/10 px-2 py-0.5 rounded-[4px]">Valentine Sale</span>
              <span className="text-white/80">Buy 2+ <span className="font-serif italic text-white text-base">Gentle Red</span> Soaps for <span className="font-bold text-white border-b border-white/40">400/-</span> each</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span className="text-[#da924b] font-medium">Ends Feb 15th</span>
              <span className="ml-6 text-xl leading-none">💝</span>
            </span>
          ))}
        </div>
      </Link> */}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ease-in-out ${isScrolled
          ? 'py-3 bg-surface/70 backdrop-blur-md backdrop-saturate-150 shadow-sm border-b border-white/10'
          : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => handleLinkClick('/')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="/images/plainbg_logo.png"
                  alt="Nature's Lather (NALA)"
                  className="relative w-15 h-15 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="hidden sm:block font-heading text-xl font-semibold text-text tracking-wide">
                Nature's Lather
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {/* Nav Pills Container */}
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20 transition-all duration-300 hover:bg-white/20">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                        ? 'bg-[#e2bd8f] text-[#3d5a3c] shadow-sm font-semibold'
                        : 'text-text-muted hover:text-text hover:bg-white/30'
                        }`}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                    }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                    }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
              }`}
          >
            <div className="bg-surface/85 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-black/5 p-4">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block py-3 px-4 rounded-xl transition-all duration-300 font-medium ${isActive
                        ? 'bg-[#e2bd8f] text-[#3d5a3c] shadow-sm font-semibold'
                        : 'text-text hover:text-secondary hover:bg-white/20'
                        }`}
                      onClick={() => handleLinkClick(item.href)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
