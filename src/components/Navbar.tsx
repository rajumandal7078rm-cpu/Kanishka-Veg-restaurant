import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, ShoppingBag, Sparkles, Utensils } from 'lucide-react';
import { BUSINESS_INFO, getRestaurantStatus, buildWhatsAppOrderLink } from '../data/restaurantData';
import { CartItem, MenuCategory } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenOrderDrawer: () => void;
  onOpenMenuModal: (category?: MenuCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenOrderDrawer, onOpenMenuModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(getRestaurantStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Specials', href: '#specials' },
    { name: 'Digital Menu', isAction: true, onClick: () => onOpenMenuModal('All') },
    { name: 'Jain Food', href: '#jain-special' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Timings', href: '#hours' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      {/* Top Notification / Status Ribbon */}
      <div className="bg-[#12131a] text-xs text-[#d1c8b8] border-b border-[#d4af37]/15 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#d4af37]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
              </span>
              {status.statusText}
            </span>
            <span className="text-[#a1998c]">•</span>
            <span className="flex items-center gap-1 text-[#c2b9a7]">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              Haji Ali Circle, Tardeo Road, Mumbai 400034
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="hover:text-[#d4af37] transition-colors flex items-center gap-1 text-[#c2b9a7]"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              {BUSINESS_INFO.primaryPhone}
            </a>
            <span className="text-[#a1998c]">•</span>
            <a
              href={`tel:${BUSINESS_INFO.mobile.replace(/\s+/g, '')}`}
              className="hover:text-[#d4af37] transition-colors text-[#c2b9a7]"
            >
              {BUSINESS_INFO.mobile}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="navbar-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0c0d12]/95 via-[#0c0d12]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            id="nav-brand-logo"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#9e7d20] to-[#59430c] p-[1.5px] shadow-lg shadow-[#d4af37]/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#0c0d12] rounded-full flex items-center justify-center">
                <span className="font-royal text-lg font-bold text-[#f5eedf] tracking-wider group-hover:text-[#d4af37] transition-colors">
                  K
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-base sm:text-lg font-bold tracking-[0.14em] text-[#f5eedf] group-hover:text-[#f3cf70] transition-colors">
                KANISHKA
              </span>
              <span className="text-[10px] tracking-[0.22em] text-[#d4af37] font-semibold uppercase -mt-0.5">
                Veg. Restaurant
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.isAction ? (
                <button
                  key={link.name}
                  type="button"
                  onClick={link.onClick}
                  className="px-3 py-1 rounded-full bg-[#1e1f2b] hover:bg-[#d4af37] text-[#e5be5a] hover:text-[#0c0d12] border border-[#d4af37]/35 text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-[#d5cebf] hover:text-[#e5be5a] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Order Cart Trigger */}
            {totalCartCount > 0 && (
              <button
                type="button"
                onClick={onOpenOrderDrawer}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#201d18] border border-[#d4af37]/40 text-[#f5eedf] text-xs hover:border-[#d4af37] transition-all"
                title="View WhatsApp Order List"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="hidden sm:inline font-medium">Order Draft</span>
                <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#0c0d12] text-[11px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              </button>
            )}

            {/* Direct WhatsApp Action */}
            <a
              id="header-order-whatsapp-btn"
              href={buildWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full btn-gold-primary text-xs uppercase tracking-wider font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Order / WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1a1b22] text-[#d5cebf] border border-[#d4af37]/20 hover:border-[#d4af37]/50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen / Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          className="fixed inset-0 z-50 bg-[#090a0d]/95 backdrop-blur-xl lg:hidden pt-20 px-6 pb-10 flex flex-col justify-between border-b border-[#d4af37]/20 animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/15">
              <span className="text-xs tracking-widest uppercase text-[#d4af37] font-semibold">
                Menu & Navigation
              </span>
              <span className="text-xs text-[#a9a193]">
                {status.isOpen ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>
            <nav className="flex flex-col gap-1.5 py-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMenuModal('All');
                }}
                className="py-3 px-3.5 rounded-xl text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#d4af37] to-[#b58b14] text-[#0c0d12] shadow-lg flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  ✨ Open Full Digital Menu (350+)
                </span>
                <span className="text-xs">→</span>
              </button>

              {navLinks
                .filter((l) => !l.isAction)
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-sm tracking-wider uppercase text-[#ede8df] hover:text-[#d4af37] hover:bg-[#1a1b22] transition-all flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-[#d4af37]/50">→</span>
                  </a>
                ))}
            </nav>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#d4af37]/15">
            <a
              href={buildWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg btn-gold-primary text-center text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Order on WhatsApp (89282 62135)
            </a>
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 rounded-lg btn-gold-secondary text-center text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              Call Restaurant ({BUSINESS_INFO.primaryPhone})
            </a>
          </div>
        </div>
      )}
    </>
  );
};
