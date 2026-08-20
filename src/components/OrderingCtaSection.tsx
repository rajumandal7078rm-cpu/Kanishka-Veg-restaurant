import React from 'react';
import { MessageCircle, Phone, Navigation, Sparkles, Bike } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';

export const OrderingCtaSection: React.FC = () => {
  return (
    <section id="order-cta" className="relative py-20 lg:py-24 bg-[#0e0f16] border-y border-[#d4af37]/20 overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute inset-0 gold-glow-hero opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1d29] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
          <Bike className="w-3.5 h-3.5" />
          <span>Delivery & Pickup Available</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb] max-w-3xl mx-auto leading-tight">
          Good Food Is Just a <span className="italic text-[#e5be5a]">Message Away</span>
        </h2>

        <p className="text-base sm:text-lg text-[#b8b0a1] max-w-2xl mx-auto font-light leading-relaxed">
          Enjoy your favourite vegetarian dishes through speedy South Mumbai delivery, takeaway pickup, or direct WhatsApp ordering.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <a
            id="cta-order-whatsapp-btn"
            href={buildWhatsAppOrderLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full btn-gold-primary text-xs sm:text-sm uppercase tracking-[0.14em] font-bold flex items-center gap-2.5 shadow-xl"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order on WhatsApp</span>
          </a>

          <a
            id="cta-call-btn"
            href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
            className="px-6 py-4 rounded-full btn-gold-secondary text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Call Now ({BUSINESS_INFO.primaryPhone})</span>
          </a>

          <a
            id="cta-directions-btn"
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-full bg-[#181924] hover:bg-[#232535] border border-[#d4af37]/30 text-[#f5eedf] text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold flex items-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#d4af37]" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Supporting Notice */}
        <p className="text-xs text-[#a9a193] pt-2">
          WhatsApp Ordering: <strong>89282 62135</strong> • Direct Landline: <strong>022 2353 6131</strong>
        </p>
      </div>
    </section>
  );
};
