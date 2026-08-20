import React from 'react';
import {
  Sparkles,
  Utensils,
  CheckCircle2,
  MapPin,
  HeartHandshake,
  Users,
} from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';

interface AboutStoryProps {
  onOpenMenuModal?: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = ({ onOpenMenuModal }) => {
  return (
    <section id="about" className="relative py-16 lg:py-24 bg-[#0c0d12] overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Dual Matched-Size Image Panels (With Upload Option) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* ========================================================================= */}
            {/* PANEL 1: Dining Ambience & AC Hall */}
            {/* ========================================================================= */}
            <div className="relative w-full group">
              {/* Gold Border Glow Accent */}
              <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/15 blur-sm" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#14151e]">
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[400px]">
                  <UploadableImage
                    imageKey="about-dining"
                    defaultSrc={RESTAURANT_IMAGES.diningInterior}
                    alt="Kanishka Veg Restaurant Spacious AC Dining Hall"
                    label="Upload Dining Photo"
                    badgePosition="top-right"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    containerClassName="relative w-full h-full"
                  />
                  
                  {/* Gradient Contrast Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/20 to-black/25 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 pointer-events-none">
                    <div className="backdrop-blur-md bg-[#0c0d12]/85 border border-[#d4af37]/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                        Modern AC Dining Hall
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Info Pill */}
                  <div className="absolute bottom-3.5 inset-x-3.5 backdrop-blur-md bg-[#0e0f16]/90 border border-[#d4af37]/30 rounded-xl p-3 sm:p-3.5 shadow-xl flex items-center justify-between z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h5 className="text-[11px] sm:text-xs font-bold text-[#f5eedf] uppercase tracking-wider">
                          Haji Ali Circle • Tardeo Road
                        </h5>
                        <p className="text-[9px] sm:text-[10px] text-[#a9a193] line-clamp-1">
                          Opposite Heera Panna Shopping Centre, Mumbai 400034
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PANEL 2: Family & Friends Dining Hospitality */}
            {/* ========================================================================= */}
            <div className="relative w-full group">
              {/* Gold Border Glow Accent */}
              <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#d4af37]/15 via-transparent to-[#d4af37]/20 blur-sm" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#14151e]">
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[400px]">
                  <UploadableImage
                    imageKey="about-family"
                    defaultSrc={RESTAURANT_IMAGES.familyDining}
                    alt="Happy family and friends dining at Kanishka Veg Restaurant"
                    label="Upload Family Photo"
                    badgePosition="top-right"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    containerClassName="relative w-full h-full"
                  />
                  
                  {/* Gradient Contrast Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/20 to-black/25 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 pointer-events-none">
                    <div className="backdrop-blur-md bg-[#0c0d12]/85 border border-[#d4af37]/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                        Family Dining & Group Celebrations
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Info Pill */}
                  <div className="absolute bottom-3.5 inset-x-3.5 backdrop-blur-md bg-[#0e0f16]/90 border border-[#d4af37]/30 rounded-xl p-3 sm:p-3.5 shadow-xl flex items-center justify-between z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center text-[#4ade80] shrink-0">
                        <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h5 className="text-[11px] sm:text-xs font-bold text-[#f5eedf] uppercase tracking-wider">
                          Heartfelt Hospitality & Pure Taste
                        </h5>
                        <p className="text-[9px] sm:text-[10px] text-[#a9a193] line-clamp-1">
                          Serving Tardeo Since Inception • Daily 9:00 AM – 12:00 Midnight
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Restaurant Story */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#181923] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb] leading-[1.18]">
              A Celebration of <span className="text-[#e5be5a] italic">Pure Vegetarian Flavours</span>
            </h2>

            <p className="text-base text-[#b8b0a1] leading-relaxed font-light">
              Located in the heart of South Mumbai at Tardeo Road, <strong className="text-[#e5be5a] font-normal">KANISHKA VEG. RESTAURANT</strong> brings
              together Indian vegetarian culinary traditions, crisp South Indian favourites, hearty Punjabi comfort food,
              Indo-Chinese sizzlers, street snacks, and dedicated Jain choices in one warm, welcoming destination.
            </p>

            <p className="text-sm text-[#9f9788] leading-relaxed font-light">
              Whether you are dining with family, grabbing a quick lunch between office hours, enjoying evening Pav Bhaji with friends, or ordering delivery to your doorstep, our kitchen is dedicated to pure vegetarian excellence prepared fresh throughout the day from 9:00 AM to midnight.
            </p>

            {/* 3 Key Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#13141d] border border-[#d4af37]/15 hover:border-[#d4af37]/35 transition-colors">
                <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38a169]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ded8cb]">Pure Vegetarian</span>
                </div>
                <p className="text-xs text-[#a9a193]">
                  Thoughtfully prepared vegetarian food with mindful kitchen purity.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#13141d] border border-[#d4af37]/15 hover:border-[#d4af37]/35 transition-colors">
                <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ded8cb]">Jain Options</span>
                </div>
                <p className="text-xs text-[#a9a193]">
                  Dedicated Jain-friendly choices cooked without onion, garlic, or roots.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#13141d] border border-[#d4af37]/15 hover:border-[#d4af37]/35 transition-colors">
                <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ded8cb]">Multi-Cuisine</span>
                </div>
                <p className="text-xs text-[#a9a193]">
                  A broad menu for families and groups with varied tastes.
                </p>
              </div>
            </div>

            {/* Discover Menu CTA */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                id="about-discover-menu-btn"
                type="button"
                onClick={() => onOpenMenuModal ? onOpenMenuModal() : window.location.assign('#menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gold-primary text-xs uppercase tracking-[0.16em] font-bold transition-all hover:scale-105 shadow-lg"
              >
                <Utensils className="w-4 h-4 text-[#0c0d12]" />
                <span>Explore 350+ Menu Items</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
