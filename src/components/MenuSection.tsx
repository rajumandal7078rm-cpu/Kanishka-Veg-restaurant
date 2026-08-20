import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  Search,
  ChevronRight,
  HeartHandshake,
  Flame,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_IMAGES, BUSINESS_INFO } from '../data/restaurantData';
import { MenuCategory } from '../types';

interface MenuSectionProps {
  onOpenMenuModal: (category?: MenuCategory, searchQuery?: string) => void;
}

interface CategoryTeaser {
  id: string;
  name: string;
  nameHindi: string;
  targetCategory: MenuCategory;
  image: string;
  itemCount: number;
  startingPrice: string;
  highlights: string[];
  tag: string;
}

const CATEGORY_TEASERS: CategoryTeaser[] = [
  {
    id: 'south-indian',
    name: 'South Indian & Heritage Dosas',
    nameHindi: 'साउथ इंडियन व डोसा क्रिएशन',
    targetCategory: 'Southern Treat',
    image: RESTAURANT_IMAGES.masalaDosa,
    itemCount: 48,
    startingPrice: '₹100',
    highlights: ['Steam Idli', 'Butter Mysore Masala', 'Cheese Rava Sada', 'Spring Dosa', 'Podi Idli'],
    tag: 'All-Day Classic',
  },
  {
    id: 'punjabi-paneer',
    name: 'North Indian & Paneer Delicacies',
    nameHindi: 'शाही पनीर व पंजाबी करी',
    targetCategory: 'Punjabi Paneer',
    image: RESTAURANT_IMAGES.paneerButter,
    itemCount: 52,
    startingPrice: '₹180',
    highlights: ['Paneer Butter Masala', 'Veg. Kadhai', 'Dal Makhani', 'Butter Naan', 'Dum Biryani'],
    tag: 'Royal Dinner Feast',
  },
  {
    id: 'pav-bhaji-snacks',
    name: 'Sizzling Pav Bhaji & Mumbai Snacks',
    nameHindi: 'मुंबई स्पेशल पाव भाजी व स्नैक्स',
    targetCategory: 'Pav Bhaji & Tawa',
    image: RESTAURANT_IMAGES.pavBhaji,
    itemCount: 45,
    startingPrice: '₹90',
    highlights: ['Amul Butter Pav Bhaji', 'Cheese Pav Bhaji', 'Toast Sandwiches', 'Veg. Club', 'Pizzas'],
    tag: 'Mumbai Favorite',
  },
  {
    id: 'tandoori-starters',
    name: 'Tandoori Sizzlers & Starters',
    nameHindi: 'तंदूरी कबाब व स्टार्टर्स',
    targetCategory: 'Tandoori & Starters',
    image: RESTAURANT_IMAGES.hero,
    itemCount: 38,
    startingPrice: '₹160',
    highlights: ['Paneer Tikka Dry', 'Veg. Crispy', 'Paneer Chilli', 'Spring Rolls', 'Hara Bhara Kabab'],
    tag: 'Party Favorite',
  },
  {
    id: 'chinese-thai',
    name: 'Indo-Chinese & Thai Specialties',
    nameHindi: 'चाइनीज राइस, नूडल्स व थाई करी',
    targetCategory: 'Chinese Rice & Noodles',
    image: RESTAURANT_IMAGES.noodles,
    itemCount: 42,
    startingPrice: '₹170',
    highlights: ['Schezwan Fried Rice', 'Hakka Noodles', 'Manchurian Gravy', 'Thai Green Curry', 'Tripple Rice'],
    tag: 'Wok Masterpieces',
  },
  {
    id: 'falooda-desserts',
    name: 'Royal Faloodas, Juices & Desserts',
    nameHindi: 'शाही फालूदा, फ्रूट क्रीम व जूस',
    targetCategory: 'Fresh Juices & Falooda',
    image: RESTAURANT_IMAGES.falooda,
    itemCount: 65,
    startingPrice: '₹90',
    highlights: ['Kanishka Special Falooda', 'Dry Fruit Shake', 'Mango Fresh Cream', 'Kesar Pista Kulfi', 'Fresh Mosambi'],
    tag: 'Sweet Indulgence',
  },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenMenuModal }) => {
  const [quickSearch, setQuickSearch] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenMenuModal('All', quickSearch);
  };

  return (
    <section
      id="menu"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#0c0d12] via-[#101119] to-[#0c0d12] relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER & REVOLUTIONARY INTRO */}
        {/* ========================================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181924] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-[0.16em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e5be5a]" />
            <span>Interactive Digital Dining</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#f7f3eb] tracking-tight">
            Explore The <span className="italic text-[#e5be5a]">Revolutionary</span> Menu
          </h2>

          <p className="text-sm sm:text-base text-[#b5ad9e] font-light leading-relaxed">
            Touch to open our full 350+ dish digital catalogue. Filter by 100% Jain preparation, search instant ingredients, customize butter & cheese toppings, and place fast WhatsApp orders in seconds.
          </p>

          {/* Quick Search Launchpad Bar */}
          <form
            onSubmit={handleQuickSearchSubmit}
            className="pt-2 max-w-xl mx-auto flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#d4af37] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 350+ dishes (e.g., Masala Dosa, Paneer Tikka, Jain Soup, Falooda)..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#141520] border border-[#d4af37]/30 focus:border-[#d4af37] text-xs sm:text-sm text-[#f7f3eb] placeholder-[#8c8475] focus:outline-none shadow-lg transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-full btn-gold-primary text-xs sm:text-sm uppercase tracking-wider font-bold shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <span>Search</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* GRAND CENTRAL REVOLUTIONARY MENU LAUNCH BUTTON */}
        {/* ========================================================================= */}
        <div className="mb-14 text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-[#d4af37]/30 via-[#f3cf70]/50 to-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/10">
            <button
              id="open-revolutionary-menu-main-btn"
              type="button"
              onClick={() => onOpenMenuModal('All')}
              className="px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-[#1c1d29] via-[#242538] to-[#1c1d29] hover:from-[#232435] hover:to-[#232435] border border-[#d4af37]/50 group transition-all transform hover:scale-[1.02] active:scale-[0.98] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-inner"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#967115] text-[#0c0d12] flex items-center justify-center font-extrabold shadow-lg shrink-0 group-hover:rotate-12 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base sm:text-xl font-serif-luxury font-bold text-[#f7f3eb] group-hover:text-[#f3cf70] transition-colors">
                    ✨ Open Full Kanishka Digital Menu (350+ Items)
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#d4af37] hidden sm:block group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#a9a193] font-light mt-0.5">
                  Touch here to view full categories, prices, Jain options & 1-click WhatsApp order
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6 INTERACTIVE CUISINE PREVIEW CARDS (CLICK TO OPEN MODAL AT CATEGORY) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORY_TEASERS.map((teaser) => (
            <div
              key={teaser.id}
              onClick={() => onOpenMenuModal(teaser.targetCategory)}
              className="luxury-card rounded-2xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/60 group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={teaser.image}
                  alt={teaser.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/40 to-transparent" />

                {/* Top Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0c0d12]/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30">
                    {teaser.tag}
                  </span>
                </div>

                {/* Bottom Item Count Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#141520]/90 backdrop-blur-md text-[#ded8cb] border border-[#d4af37]/25">
                    {teaser.itemCount} Dishes • From {teaser.startingPrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif-luxury font-semibold text-[#f7f3eb] group-hover:text-[#f3cf70] transition-colors">
                    {teaser.name}
                  </h3>
                  <p className="text-xs text-[#d4af37]/80 font-medium">{teaser.nameHindi}</p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {teaser.highlights.map((dishName) => (
                      <span
                        key={dishName}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#161723] text-[#c4bba9] border border-[#d4af37]/15"
                      >
                        {dishName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA trigger */}
                <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs font-semibold text-[#d4af37] group-hover:text-[#f3cf70]">
                  <span>Explore {teaser.itemCount} Dishes</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] uppercase tracking-wider">Touch to View</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CHEF CUSTOMIZATION NOTES BANNER */}
        {/* ========================================================================= */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-[#141520] border border-[#d4af37]/25 text-xs text-[#ded8cb] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="font-bold text-[#f7f3eb]">Kanishka Kitchen Customizations & Notes:</p>
              <p className="text-[11px] text-[#a9a193]">
                Ghee / Butter Extra ₹40/- • Cheese / Paneer Extra ₹50/- • Extra Chutney / Sambar ₹20/- • Milk Shake with Ice Cream Extra ₹30/-
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenMenuModal('Jain Special')}
            className="px-4 py-2 rounded-lg bg-[#201d14] hover:bg-[#2b271b] text-[#f3cf70] border border-[#d4af37]/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>View Dedicated Jain Menu</span>
          </button>
        </div>
      </div>
    </section>
  );
};
