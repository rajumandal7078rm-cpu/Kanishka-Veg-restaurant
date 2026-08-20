import React from 'react';
import { Utensils, MessageCircle, Phone, Navigation, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';
import { CartItem } from '../types';

interface MobileActionBarProps {
  cart: CartItem[];
  onOpenOrderDrawer: () => void;
  onOpenMenuModal?: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ cart, onOpenOrderDrawer, onOpenMenuModal }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenMenuModal) {
      onOpenMenuModal();
    } else {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      id="mobile-floating-action-bar"
      aria-label="Quick Restaurant Actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0a0b10]/95 backdrop-blur-2xl border-t border-[#d4af37]/35 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] px-2 pt-2 pb-2.5 safe-area-pb"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5 items-stretch text-center">
        {/* 1. MENU BUTTON */}
        {totalItems > 0 ? (
          <button
            id="mobile-nav-draft"
            type="button"
            onClick={onOpenOrderDrawer}
            className="group flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#e6c86e] to-[#b89327] text-[#0c0d12] font-extrabold shadow-md active:scale-95 transition-all min-h-[48px]"
            aria-label={`View order draft with ${totalItems} items`}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[10px] leading-none font-black bg-[#0c0d12] text-[#f3cf70] px-1 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0c0d12] leading-none">
              DRAFT
            </span>
          </button>
        ) : (
          <button
            id="mobile-nav-menu"
            type="button"
            onClick={handleMenuClick}
            className="group flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#14151f] border border-[#d4af37]/25 active:scale-95 active:bg-[#202232] transition-all min-h-[48px]"
            aria-label="Browse Restaurant Menu"
          >
            <div className="w-6 h-6 rounded-full bg-[#d4af37]/15 flex items-center justify-center mb-0.5 group-hover:bg-[#d4af37]/25 transition-colors">
              <Utensils className="w-3.5 h-3.5 text-[#e5be5a]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5eedf] leading-none">
              MENU
            </span>
          </button>
        )}

        {/* 2. ORDER BUTTON */}
        <a
          id="mobile-nav-order"
          href={buildWhatsAppOrderLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0f1f16] border border-[#22c55e]/35 active:scale-95 active:bg-[#163523] transition-all min-h-[48px]"
          aria-label="Order food via WhatsApp"
        >
          <div className="w-6 h-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center mb-0.5 group-hover:bg-[#22c55e]/30 transition-colors">
            <MessageCircle className="w-3.5 h-3.5 text-[#22c55e] fill-current" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#22c55e] leading-none">
            ORDER
          </span>
        </a>

        {/* 3. CALL BUTTON */}
        <a
          id="mobile-nav-call"
          href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
          className="group flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#14151f] border border-[#d4af37]/25 active:scale-95 active:bg-[#202232] transition-all min-h-[48px]"
          aria-label={`Call Kanishka Veg Restaurant at ${BUSINESS_INFO.primaryPhone}`}
        >
          <div className="w-6 h-6 rounded-full bg-[#d4af37]/15 flex items-center justify-center mb-0.5 group-hover:bg-[#d4af37]/25 transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5eedf] leading-none">
            CALL
          </span>
        </a>

        {/* 4. DIRECTIONS BUTTON */}
        <a
          id="mobile-nav-directions"
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#14151f] border border-[#d4af37]/25 active:scale-95 active:bg-[#202232] transition-all min-h-[48px]"
          aria-label="Get Google Maps navigation directions to Kanishka Restaurant"
        >
          <div className="w-6 h-6 rounded-full bg-[#d4af37]/15 flex items-center justify-center mb-0.5 group-hover:bg-[#d4af37]/25 transition-colors">
            <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5eedf] leading-none">
            DIRECTIONS
          </span>
        </a>
      </div>
    </nav>
  );
};
