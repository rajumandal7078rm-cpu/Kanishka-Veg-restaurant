import React from 'react';
import { Sparkles, MessageCircle, Plus, Check } from 'lucide-react';
import { SIGNATURE_DISHES, buildWhatsAppOrderLink } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';
import { MenuItem } from '../types';

interface SignatureDishesProps {
  onAddToCart: (item: MenuItem) => void;
  isInCart: (id: string) => boolean;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onAddToCart, isInCart }) => {
  return (
    <section id="specials" className="relative py-16 lg:py-24 bg-[#0e0f15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181922] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Signatures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Handcrafted <span className="text-[#e5be5a] italic">Specialities</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a9a193] font-light">
            Our most loved culinary creations, prepared fresh with heirloom spices, pure desi ghee, and authentic recipes.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SIGNATURE_DISHES.map((dish) => {
            const inCart = isInCart(dish.id);

            return (
              <div
                key={dish.id}
                id={`signature-dish-${dish.id}`}
                className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-[#d4af37]/20 hover:border-[#d4af37]/45 transition-all duration-300 shadow-xl bg-[#12131b]"
              >
                {/* Image Container with Badges & Upload Option */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#161720]">
                  <UploadableImage
                    imageKey={`dish-${dish.id}`}
                    defaultSrc={dish.image}
                    alt={`${dish.name} at Kanishka Veg Restaurant Tardeo Mumbai`}
                    label="Upload Dish Photo"
                    badgePosition="top-right"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    containerClassName="relative w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-transparent to-black/35 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0c0d12]/80 backdrop-blur-md text-[#e5be5a] border border-[#d4af37]/30">
                      {dish.category}
                    </span>
                    {dish.isBestseller && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37] text-[#0c0d12] shadow-md">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Veg / Jain Pill bottom left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 pointer-events-none z-10">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#14281a]/90 backdrop-blur-sm text-[#4ade80] border border-[#22c55e]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      Pure Veg
                    </span>
                    {dish.isJain && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#261f12]/90 backdrop-blur-sm text-[#fbbf24] border border-[#f59e0b]/30">
                        Jain Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-serif-luxury font-medium text-[#f7f3eb] group-hover:text-[#f3cf70] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <span className="text-base font-bold text-[#e5be5a] font-sans tracking-wide shrink-0">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#a9a193] line-clamp-2 font-light leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onAddToCart(dish)}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                        inCart
                          ? 'bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40'
                          : 'bg-[#181a24] hover:bg-[#d4af37] text-[#ded8cb] hover:text-[#0c0d12] border border-[#d4af37]/25'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Draft</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppOrderLink([{ name: dish.name, quantity: 1, price: dish.price }])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#0f1f16] hover:bg-[#163523] border border-[#22c55e]/30 text-[#22c55e] flex items-center justify-center transition-colors shadow-sm"
                      title={`Order ${dish.name} directly on WhatsApp`}
                      aria-label={`Order ${dish.name} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
