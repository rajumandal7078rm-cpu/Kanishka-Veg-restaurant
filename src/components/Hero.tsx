import React from 'react';
import {
  Utensils,
  MessageCircle,
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { BUSINESS_INFO, RESTAURANT_IMAGES, buildWhatsAppOrderLink } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';
import { MenuCategory } from '../types';

interface HeroProps {
  onOpenMenuModal?: (category?: MenuCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenuModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-4 pb-16 lg:py-16"
    >
      {/* Dark Ambient Atmosphere & Glow Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d12] via-[#101118] to-[#0c0d12] -z-10" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full gold-glow-hero pointer-events-none -z-10 opacity-75 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#d4af37]/5 pointer-events-none -z-10 blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 lg:space-y-10">
        
        {/* ========================================================================= */}
        {/* 1. TOP PANORAMIC RESTAURANT FACADE PANEL (WITH UPLOAD OPTION) */}
        {/* ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#14151e] group">
          {/* Outer Subtle Ambient Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37]/25 via-transparent to-[#d4af37]/20 blur-sm -z-10" />

          <div className="relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[460px] w-full overflow-hidden">
            <UploadableImage
              imageKey="hero-facade"
              defaultSrc={RESTAURANT_IMAGES.facadeSignboard}
              alt="KANISHKA VEG RESTAURANT Exterior Signboard"
              label="Upload Facade Photo"
              badgePosition="top-right"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              containerClassName="relative w-full h-full"
            />

            {/* Dark Contrast Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/25 to-black/35 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="backdrop-blur-md bg-[#0c0d12]/85 border border-[#d4af37]/30 rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full border border-[#22c55e] p-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                  100% Pure Veg • Tardeo, South Mumbai
                </span>
              </div>
            </div>

            {/* Bottom Floating Information Strip */}
            <div className="absolute bottom-4 inset-x-4 backdrop-blur-md bg-[#12131b]/90 border border-[#d4af37]/35 rounded-xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between gap-2 z-10">
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#e5be5a]" />
                  Haji Ali Circle • Opposite Heera Panna Shopping Centre
                </span>
                <h4 className="text-xs sm:text-sm md:text-base font-serif-luxury font-medium text-[#f5eedf] line-clamp-1">
                  KANISHKA VEG. RESTAURANT • कनिष्का
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onOpenMenuModal ? onOpenMenuModal('All') : window.location.assign('#menu')}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg btn-gold-primary text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 shadow-md"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN HERO HEADLINE & ACTIONS SECTION */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto flex flex-col justify-center text-center items-center space-y-6 sm:space-y-7 py-2">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181922] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.18em] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e5be5a]" />
            <span>Welcome to Kanishka Veg. Restaurant</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif-luxury font-normal tracking-tight text-[#f7f3eb] leading-[1.12]">
            Where Pure Vegetarian Flavours Meet{' '}
            <span className="italic text-[#e5be5a] font-normal">Modern Indian Elegance</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#b8b0a1] leading-relaxed max-w-3xl font-light">
            South Mumbai’s premier pure vegetarian and Jain multi-cuisine destination at Haji Ali Circle, Tardeo.
            Savour Chef's live tawa Pav Bhaji, authentic Mysore masala dosas, rich Punjabi curries, Indo-Chinese noodles,
            Cheese Cherry Pineapple skewers, fruit shakes, and dedicated Jain culinary creations.
          </p>

          {/* Conversion CTA Group - Primary View Menu, Secondary WhatsApp, Directions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2 w-full max-w-xl">
            {/* 1. PRIMARY CTA: VIEW MENU */}
            <button
              id="hero-view-menu-btn"
              type="button"
              onClick={() => onOpenMenuModal ? onOpenMenuModal('All') : window.location.assign('#menu')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full btn-gold-primary text-xs sm:text-sm uppercase tracking-[0.14em] font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Utensils className="w-4 h-4" />
              <span>VIEW MENU (350+)</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>

            {/* 2. SECONDARY CTA: ORDER ON WHATSAPP */}
            <a
              id="hero-order-whatsapp-btn"
              href={buildWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full btn-gold-secondary text-xs sm:text-sm uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-[#d4af37] fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            {/* 3. TERTIARY CTA: GET DIRECTIONS */}
            <a
              id="hero-get-directions-btn"
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#161720] hover:bg-[#20212d] border border-[#d4af37]/25 text-[#c8c0af] hover:text-[#ffffff] text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Bottom Verified Trust Highlight Badges */}
          <div className="pt-4 border-t border-[#d4af37]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-xs text-[#c4bba9] w-full max-w-2xl">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38a169]" />
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#ded8cb]">100% Pure Veg</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#ded8cb]">Jain Food Available</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#ded8cb]">Multi-Cuisine</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38a169]" />
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#ded8cb]">Open 7 Days</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CHEF'S LIVE PAV BHAJI & SIGNATURE SPECIALITIES (WITH UPLOAD OPTION) */}
        {/* ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#14151e] group">
          {/* Outer Subtle Ambient Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/25 blur-sm -z-10" />

          <div className="relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[460px] w-full overflow-hidden">
            <UploadableImage
              imageKey="hero-chef"
              defaultSrc={RESTAURANT_IMAGES.chefPavBhaji}
              alt="Chef Bholu Live Pav Bhaji Cooking on Tawa"
              label="Upload Chef Photo"
              badgePosition="top-right"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              containerClassName="relative w-full h-full"
            />

            {/* Dark Contrast Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/25 to-black/35 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="backdrop-blur-md bg-[#0c0d12]/85 border border-[#d4af37]/30 rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                <HeartHandshake className="w-3.5 h-3.5 text-[#e5be5a]" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                  Live Kitchen • Chef's Sizzling Pav Bhaji
                </span>
              </div>
            </div>

            {/* Bottom Floating Information Strip */}
            <div className="absolute bottom-4 inset-x-4 backdrop-blur-md bg-[#12131b]/90 border border-[#d4af37]/35 rounded-xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between gap-2 z-10">
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  Live Tawa Cooking • Amul Butter & Fresh Spices
                </span>
                <h4 className="text-xs sm:text-sm md:text-base font-serif-luxury font-medium text-[#f5eedf] line-clamp-1">
                  Famous Tardeo Pav Bhaji, Cheese Pav Bhaji & Jain Pav Bhaji
                </h4>
              </div>
              <a
                href={buildWhatsAppOrderLink([{ name: 'Chef’s Special Pav Bhaji', quantity: 1, price: '₹220' }])}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg btn-gold-secondary text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#d4af37] fill-current" />
                <span>Order Pav Bhaji</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. MODERN DINING HALL INTERIOR AMBIENCE (WITH UPLOAD OPTION) */}
        {/* ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#14151e] group">
          {/* Outer Subtle Ambient Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37]/25 via-transparent to-[#d4af37]/20 blur-sm -z-10" />

          <div className="relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[460px] w-full overflow-hidden">
            <UploadableImage
              imageKey="hero-dining"
              defaultSrc={RESTAURANT_IMAGES.diningInterior}
              alt="Kanishka Veg Restaurant Air Conditioned Dining Hall"
              label="Upload Dining Hall Photo"
              badgePosition="top-right"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              containerClassName="relative w-full h-full"
            />

            {/* Dark Contrast Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/25 to-black/35 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="backdrop-blur-md bg-[#0c0d12]/85 border border-[#d4af37]/30 rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#e5be5a]" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                  AC Dining Hall & Family Booth Seating
                </span>
              </div>
            </div>

            {/* Bottom Floating Information Strip */}
            <div className="absolute bottom-4 inset-x-4 backdrop-blur-md bg-[#12131b]/90 border border-[#d4af37]/35 rounded-xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between gap-2 z-10">
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  1st Floor • Tardeo Road • Haji Ali Circle
                </span>
                <h4 className="text-xs sm:text-sm md:text-base font-serif-luxury font-medium text-[#f5eedf] line-clamp-1">
                  Air-Conditioned Comfort • Family Dining & Celebrations
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onOpenMenuModal ? onOpenMenuModal('All') : window.location.assign('#menu')}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg btn-gold-primary text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 shadow-md"
              >
                Explore Menu
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
