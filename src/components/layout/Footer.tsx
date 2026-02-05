export function Footer() {
  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '#products' },
        { label: 'Refreshing Soap', href: '#products' },
        { label: 'Turmeric Soap', href: '#products' },
        { label: 'Detox Soap', href: '#products' },
        { label: 'Exfoliant Soap', href: '#products' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '#story' },
        { label: 'Why NALA', href: '#benefits' },
        { label: 'Ingredients', href: '#' },
        { label: 'Our Process', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '#faq' },
        { label: 'Shipping & Delivery', href: '#' },
        { label: 'Returns Policy', href: '#' },
        { label: 'Contact Us', href: '#contact' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Instagram', href: 'https://instagram.com/natureslather.ke' },
        { label: 'Facebook', href: 'https://facebook.com/natureslatherke' },
        { label: 'WhatsApp', href: 'https://wa.me/254700000000' },
      ],
    },
  ];

  return (
    <footer className="bg-text text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img
              src="/images/color_logo.jpg"
              alt="Nature's Lather (NALA)"
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Pure Ingredients. Pure Clean.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Nature's Lather. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
