import { Link } from 'react-router-dom';

export function Footer() {


  return (
    <footer className="bg-text text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/images/plainbg_logo.png"
                alt="Nature's Lather (NALA)"
                className="h-40 w-40 object-contain rounded-full mb-4"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Take care of your skin. It’s the only place you live in.
            </p>
            <p className="text-white/40 text-xs italic">
              From Nature. For Skin.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-white/60 hover:text-primary transition-colors text-sm">All Products</Link></li>
              <li><Link to="/shop?product=refreshing" className="text-white/60 hover:text-primary transition-colors text-sm">Refreshing Soap</Link></li>
              <li><Link to="/shop?product=turmeric" className="text-white/60 hover:text-primary transition-colors text-sm">Turmeric Soap</Link></li>
              <li><Link to="/shop?product=detox" className="text-white/60 hover:text-primary transition-colors text-sm">Detox Soap</Link></li>
              <li><Link to="/shop?product=exfoliant" className="text-white/60 hover:text-primary transition-colors text-sm">Exfoliant Soap</Link></li>
              <li><Link to="/shop?product=gentle-red" className="text-white/60 hover:text-primary transition-colors text-sm">Gentle Red Soap</Link></li>
              <li><Link to="/shop?product=soap-saver" className="text-white/60 hover:text-primary transition-colors text-sm">Soap Saver</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/#story" className="text-white/60 hover:text-primary transition-colors text-sm">Our Story</Link></li>
              <li><Link to="/#benefits" className="text-white/60 hover:text-primary transition-colors text-sm">Why NALA</Link></li>
              <li><Link to="/shop" className="text-white/60 hover:text-primary transition-colors text-sm">Ingredients</Link></li>
              <li><Link to="/#process" className="text-white/60 hover:text-primary transition-colors text-sm">Our Process</Link></li>
            </ul>
          </div>

          {/* Support & Connect Column */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-8">
              <li><Link to="/#faq" className="text-white/60 hover:text-primary transition-colors text-sm">FAQ</Link></li>
            </ul>

            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.instagram.com/natures_lather/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/254702255299" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © Nature’s Lather — Crafted with intention
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
