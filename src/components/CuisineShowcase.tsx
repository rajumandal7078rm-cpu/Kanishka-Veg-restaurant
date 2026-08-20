import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CUISINE_CATEGORIES } from '../data/restaurantData';
import { MenuCategory } from '../types';

interface CuisineShowcaseProps {
  onSelectCategory: (category: MenuCategory) => void;
  onOpenMenuModal?: (category: MenuCategory) => void;
}

export const CuisineShowcase: React.FC<CuisineShowcaseProps> = ({ onSelectCategory, onOpenMenuModal }) => {
  const handleCategoryClick = (cat: MenuCategory) => {
    onSelectCategory(cat);
    if (onOpenMenuModal) {
      onOpenMenuModal(cat);
    } else {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="cuisines" className="relative py-20 lg:py-24 bg-[#0a0b0f] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161720] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flavours of India & Beyond</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Multi-Cuisine Delicacies
          </h2>

          <p className="text-sm sm:text-base text-[#b8b0a1] font-light">
            Explore authentic traditions, contemporary fusion, and time-honored recipes perfected under one roof.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUISINE_CATEGORIES.map((cuisine, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between"
              onClick={() => handleCategoryClick(cuisine.category)}
            >
              <div className="relative h-48 overflow-hidden bg-[#161720]">
                <img
                  src={cuisine.image}
                  alt={cuisine.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101117] via-black/40 to-transparent" />

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#0c0d12]/80 backdrop-blur-sm text-[#e5be5a] border border-[#d4af37]/30">
                  {cuisine.itemCount}
                </span>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-serif-luxury font-medium text-[#f5eedf] group-hover:text-[#f3cf70] transition-colors">
                    {cuisine.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs sm:text-sm text-[#a9a193] font-light leading-relaxed">
                  {cuisine.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold tracking-wider uppercase group-hover:text-[#f3cf70]">
                  <span>Explore Menu Items</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
