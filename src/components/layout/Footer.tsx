import { Link } from 'react-router-dom';

export function Footer() {
  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/shop' },
        { label: 'Refreshing Soap', href: '/shop' },
        { label: 'Turmeric Soap', href: '/shop' },
        { label: 'Detox Soap', href: '/shop' },
        { label: 'Exfoliant Soap', href: '/shop' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/#story' },
        { label: 'Why NALA', href: '/#benefits' },
        { label: 'Ingredients', href: '#' },
        { label: 'Our Process', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/#faq' },
        { label: 'Shipping & Delivery', href: '#' },
        { label: 'Returns Policy', href: '#' },
        { label: 'Contact Us', href: '/#contact' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Instagram', href: 'https://instagram.com/natureslather.ke' },
        { label: 'Facebook', href: 'https://facebook.com/natureslatherke' },
        { label: 'WhatsApp', href: 'https://wa.me/254702255299' },
      ],
    },
  ];

  return (
    <footer className="bg-text text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src="/images/plainbg_logo.png"
                alt="Nature's Lather (NALA)"
                className="h-40 w-40 object-contain rounded-full mb-4"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Take care of your skin. It’s the only place you live in.
            </p>
            <p className="text-white/40 text-xs italic">
              Pure Ingredients. Pure Clean.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-white/60 hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
