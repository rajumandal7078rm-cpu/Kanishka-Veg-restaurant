import React from 'react';
import { HeartHandshake, Sparkles, MessageCircle, Utensils, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_IMAGES, MENU_ITEMS, buildWhatsAppOrderLink } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';
import { MenuCategory } from '../types';

interface JainSpecialSectionProps {
  onSelectCategory: (cat: MenuCategory) => void;
  onOpenMenuModal?: (cat: MenuCategory) => void;
}

export const JainSpecialSection: React.FC<JainSpecialSectionProps> = ({ onSelectCategory, onOpenMenuModal }) => {
  const jainDishes = MENU_ITEMS.filter((item) => item.category === 'Jain Special' || item.id === 'jain-pav-bhaji');

  return (
    <section id="jain-special" className="relative py-20 lg:py-28 bg-[#0a0b0f] border-t border-[#d4af37]/15 overflow-hidden">
      {/* Subtle serene glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Jain Philosophy & Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181923] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Dedicated Kitchen Traditions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb] leading-[1.18]">
              Jain <span className="italic text-[#e5be5a]">Specialities</span>
            </h2>

            <p className="text-base text-[#b8b0a1] leading-relaxed font-light">
              Thoughtfully prepared Jain-friendly choices for guests seeking vegetarian dining with specific dietary preferences.
              Every Jain specialty is meticulously crafted without onion, garlic, potatoes, or underground root vegetables,
              while honoring authentic Indian aromatic spices, rich dairy paneer, and slow-simmered perfection.
            </p>

            {/* Jain Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5eedf]">Strict Dietary Adherence</h4>
                  <p className="text-xs text-[#a9a193]">Zero onion, garlic, carrot, radish, or root vegetables used in preparation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5eedf]">Broad Multi-Cuisine Variety</h4>
                  <p className="text-xs text-[#a9a193]">From Jain Pav Bhaji (raw banana base) to Jain Paneer Masala, Jain Dal, and Jain Dosas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5eedf]">Dedicated Utensils & Fresh Preparation</h4>
                  <p className="text-xs text-[#a9a193]">Prepared fresh upon order with separate handling for peace of mind.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('Jain Special');
                  if (onOpenMenuModal) {
                    onOpenMenuModal('Jain Special');
                  } else {
                    const menuEl = document.getElementById('menu');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 rounded-full btn-gold-primary text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-lg"
              >
                <Utensils className="w-4 h-4" />
                <span>View Dedicated Jain Menu</span>
              </button>

              <a
                href={buildWhatsAppOrderLink([
                  { name: 'Jain Paneer Masala', quantity: 1, price: '₹330' },
                  { name: 'Jain Dal Tadka', quantity: 1, price: '₹205' },
                ])}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full btn-gold-secondary text-xs uppercase tracking-wider font-medium flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#d4af37] fill-current" />
                <span>Order Jain Food</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Jain Highlights Card */}
          <div className="lg:col-span-6">
            <div className="luxury-card rounded-2xl overflow-hidden p-6 sm:p-7 space-y-6">
              <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden border border-[#d4af37]/25 group">
                <UploadableImage
                  imageKey="jain-thali"
                  defaultSrc={RESTAURANT_IMAGES.jainThali}
                  alt="Kanishka Jain Speciality Dining"
                  label="Upload Jain Photo"
                  badgePosition="top-right"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  containerClassName="relative w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0c0d12]/90 text-[#f3cf70] border border-[#d4af37]/35 z-10 pointer-events-none">
                  Pure Jain Culinary Artistry
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold">
                  Featured Jain Selections
                </h4>
                <div className="divide-y divide-[#d4af37]/10">
                  {jainDishes.slice(0, 3).map((dish) => (
                    <div key={dish.id} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-[#f5eedf] font-serif-luxury">{dish.name}</h5>
                        <p className="text-xs text-[#a9a193] line-clamp-1">{dish.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#e5be5a] whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
