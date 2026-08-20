import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowUp, Sparkles, Heart, Lock, Unlock } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';
import { MenuCategory } from '../types';
import { useCustomImages } from '../context/CustomImageContext';

interface FooterProps {
  onOpenMenuModal?: (category?: MenuCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenuModal }) => {
  const { isEditMode, toggleEditMode } = useCustomImages();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080b] text-[#a9a193] border-t border-[#d4af37]/20 pt-16 pb-28 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#d4af37]/15">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#9e7d20] to-[#59430c] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0c0d12] rounded-full flex items-center justify-center">
                  <span className="font-royal text-lg font-bold text-[#f5eedf]">K</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-royal text-base sm:text-lg font-bold tracking-[0.14em] text-[#f5eedf]">
                  KANISHKA
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#d4af37] font-semibold uppercase -mt-0.5">
                  Veg. Restaurant
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#958e80] leading-relaxed font-light">
              South Mumbai’s destination for pure vegetarian and Jain multi-cuisine dining.
              Serving South Indian dosas, Punjabi delicacies, Indo-Chinese specials, pav bhaji, shakes, and falooda at Haji Ali Circle, Tardeo.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#161722] text-[#4ade80] border border-[#22c55e]/30">
                100% Pure Veg
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#161722] text-[#e5be5a] border border-[#d4af37]/30">
                Jain Specialities
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5eedf] font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#d4af37] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d4af37] transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#d4af37] transition-colors">Signature Dishes</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('All')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  Digital Menu (350+ Items)
                </button>
              </li>
              <li>
                <a href="#jain-special" className="hover:text-[#d4af37] transition-colors">Jain Food</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4af37] transition-colors">Restaurant Gallery</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-[#d4af37] transition-colors">Opening Hours</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Dining Offerings */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5eedf] font-semibold">
              Dining Offerings
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('Southern Treat')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  South Indian Dosas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('Punjabi Paneer')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  Punjabi & Paneer Special
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('Chinese Rice & Noodles')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  Indo-Chinese Sizzlers
                </button>
              </li>
              <li>
                <a href="#jain-special" className="hover:text-[#d4af37] transition-colors">Jain Special Menu</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('Pav Bhaji & Tawa')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  Mumbai Pav Bhaji
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMenuModal && onOpenMenuModal('Fresh Juices & Falooda')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  Shakes & Royal Falooda
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5eedf] font-semibold">
              Restaurant Location & Hours
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-[#ded8cb]">
                  Shop No. 5/B, 1st Floor, Tardeo Road, Haji Ali Circle, Opposite Heera Panna Shopping Centre, Mumbai – 400034
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#d4af37]">
                  {BUSINESS_INFO.primaryPhone} / {BUSINESS_INFO.mobile}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 12:00 AM (Open 7 Days)</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gold-primary text-xs uppercase tracking-wider font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Order (89282 62135)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#827a6f]">
          <p>© {new Date().getFullYear()} KANISHKA VEG. RESTAURANT. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] hidden sm:inline">Pure Vegetarian Multi-Cuisine Dining • Tardeo, Mumbai</span>
            
            {/* Discreet Admin / Owner Photo Upload Mode Lock Button */}
            <button
              type="button"
              onClick={toggleEditMode}
              className={`p-1.5 rounded-md border text-[10px] flex items-center gap-1 transition-all ${
                isEditMode
                  ? 'bg-[#1b2b1a] border-[#22c55e]/50 text-[#86efac]'
                  : 'bg-[#101118] border-[#d4af37]/15 text-[#5e574c] hover:text-[#c4bba9]'
              }`}
              title={isEditMode ? 'Click to Lock Public View (Hide Upload Buttons)' : 'Owner Photo Edit Mode'}
            >
              {isEditMode ? <Unlock className="w-3 h-3 text-[#22c55e]" /> : <Lock className="w-3 h-3" />}
              <span>{isEditMode ? 'Live Mode: Unlocked' : 'Locked'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#14151e] border border-[#d4af37]/20 text-[#d4af37] hover:text-[#ffffff] hover:border-[#d4af37] transition-all"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
