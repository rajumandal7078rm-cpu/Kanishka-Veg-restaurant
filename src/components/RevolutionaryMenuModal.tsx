import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Sparkles,
  Plus,
  Minus,
  MessageCircle,
  Utensils,
  HeartHandshake,
  Flame,
  LayoutGrid,
  List,
  ChevronRight,
  ShoppingBag,
  ArrowUp,
  Share2,
  Check,
} from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';
import { MenuItem, MenuCategory, CartItem } from '../types';

interface RevolutionaryMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: MenuCategory;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateCartQuantity: (itemId: string, delta: number) => void;
  onOpenOrderDrawer: () => void;
}

// 6 Mega Groups for High-Level Categorization
interface MegaGroup {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  categories: MenuCategory[];
}

const MEGA_GROUPS: MegaGroup[] = [
  {
    id: 'all',
    name: 'All Dishes',
    nameHindi: 'संपूर्ण मेनू',
    icon: '✨',
    categories: ['All'],
  },
  {
    id: 'south-indian',
    name: 'South Indian & Dosas',
    nameHindi: 'साउथ इंडियन व डोसा',
    icon: '🥞',
    categories: ['Southern Treat', 'Dosa & Creations', 'For Fasting'],
  },
  {
    id: 'street-snacks',
    name: 'Pav Bhaji, Pizza & Snacks',
    nameHindi: 'पाव भाजी, पिज़्ज़ा व स्नैक्स',
    icon: '🥪',
    categories: ['Pav Bhaji & Tawa', 'Sandwiches', 'Pizza & Pasta', 'Lite Bites & Soups'],
  },
  {
    id: 'tandoori-starters',
    name: 'Tandoori & Chinese Starters',
    nameHindi: 'तंदूरी व स्टार्टर्स',
    icon: '🍢',
    categories: ['Tandoori & Starters', 'Chinese Starters'],
  },
  {
    id: 'punjabi-mains',
    name: 'North Indian & Punjabi Feasts',
    nameHindi: 'शाही पंजाबी करी व रोटियां',
    icon: '🥘',
    categories: ['Punjabi Paneer', 'Punjabi Specialities', 'Dal & Basmati Khazana', 'Roti Ki Tokri'],
  },
  {
    id: 'chinese-thai',
    name: 'Indo-Chinese & Thai Wok',
    nameHindi: 'चाइनीज व थाई स्पेशल',
    icon: '🥢',
    categories: ['Chinese Rice & Noodles', 'Chinese & Thai Mains'],
  },
  {
    id: 'drinks-desserts',
    name: 'Juices, Shakes, Falooda & Desserts',
    nameHindi: 'जूस, फ़ालूदा व आइसक्रीम',
    icon: '🍨',
    categories: [
      'Fresh Juices & Falooda',
      'Milk Shakes',
      'Fresh Creams & Desserts',
      'Mocktails & Mojitos',
      'Lassi, Coolers & Beverages',
    ],
  },
  {
    id: 'jain-specials',
    name: '100% Jain Delicacies',
    nameHindi: 'जैन स्पेशल व्यंजन',
    icon: '🕊️',
    categories: ['Jain Special'],
  },
];

// All Detailed 22 Category Tabs matching the authentic 37 menu sections
const ALL_CATEGORY_TABS: { label: string; value: MenuCategory; group: string; count?: number }[] = [
  { label: 'All Items (350+)', value: 'All', group: 'all' },
  { label: 'Southern Treat', value: 'Southern Treat', group: 'south-indian' },
  { label: "Dosa's & Creations", value: 'Dosa & Creations', group: 'south-indian' },
  { label: 'For Fasting (Upvas)', value: 'For Fasting', group: 'south-indian' },
  { label: 'Sandwiches & Toasts', value: 'Sandwiches', group: 'street-snacks' },
  { label: 'Pizza & Pasta', value: 'Pizza & Pasta', group: 'street-snacks' },
  { label: 'Pav Bhaji & Tawa Pulav', value: 'Pav Bhaji & Tawa', group: 'street-snacks' },
  { label: 'Lite Bites & Soup Sip', value: 'Lite Bites & Soups', group: 'street-snacks' },
  { label: 'Starters on the Platter', value: 'Tandoori & Starters', group: 'tandoori-starters' },
  { label: "Chef's Special Starters", value: 'Chinese Starters', group: 'tandoori-starters' },
  { label: 'Punjabi Paneer Delicacies', value: 'Punjabi Paneer', group: 'punjabi-mains' },
  { label: 'Punjabi Veg Specialities', value: 'Punjabi Specialities', group: 'punjabi-mains' },
  { label: 'Dal & Basmati Khazana', value: 'Dal & Basmati Khazana', group: 'punjabi-mains' },
  { label: 'Roti Ki Tokri', value: 'Roti Ki Tokri', group: 'punjabi-mains' },
  { label: 'Chinese Rice & Noodles', value: 'Chinese Rice & Noodles', group: 'chinese-thai' },
  { label: 'Chinese & Thai Mains', value: 'Chinese & Thai Mains', group: 'chinese-thai' },
  { label: 'Juicy Juice & Faloodas', value: 'Fresh Juices & Falooda', group: 'drinks-desserts' },
  { label: 'Thick Milk Shakes', value: 'Milk Shakes', group: 'drinks-desserts' },
  { label: 'Fresh Creams & Desserts', value: 'Fresh Creams & Desserts', group: 'drinks-desserts' },
  { label: 'Mocktails & Mojitos', value: 'Mocktails & Mojitos', group: 'drinks-desserts' },
  { label: 'Lassi, Coolers & Hot Spot', value: 'Lassi, Coolers & Beverages', group: 'drinks-desserts' },
  { label: '100% Jain Specials', value: 'Jain Special', group: 'jain-specials' },
];

export const RevolutionaryMenuModal: React.FC<RevolutionaryMenuModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'All',
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onOpenOrderDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMegaGroup, setSelectedMegaGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(initialCategory);
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'jain' | 'bestseller'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial category when modal opens
  useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategory(initialCategory);
      const matchedGroup = MEGA_GROUPS.find((g) =>
        (g.categories as string[]).includes(initialCategory)
      );
      if (matchedGroup) {
        setSelectedMegaGroup(matchedGroup.id);
      }
    }
  }, [isOpen, initialCategory]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard shortcut: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Mega Group / Category Filtering
      let matchesCategory = false;
      if (selectedCategory !== 'All') {
        matchesCategory =
          selectedCategory === 'Jain Special'
            ? item.isJain === true || item.category === 'Jain Special'
            : item.category === selectedCategory;
      } else if (selectedMegaGroup !== 'all') {
        const groupObj = MEGA_GROUPS.find((g) => g.id === selectedMegaGroup);
        if (groupObj) {
          if (groupObj.id === 'jain-specials') {
            matchesCategory = item.isJain === true;
          } else {
            matchesCategory = groupObj.categories.includes(item.category);
          }
        } else {
          matchesCategory = true;
        }
      } else {
        matchesCategory = true;
      }

      // Dietary Filter
      let matchesDietary = true;
      if (dietaryFilter === 'jain') {
        matchesDietary = item.isJain === true;
      } else if (dietaryFilter === 'bestseller') {
        matchesDietary = item.isBestseller === true;
      }

      // Search Query Matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.price.toLowerCase().includes(q);
      }

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, selectedMegaGroup, dietaryFilter, searchQuery]);

  // Group items by category for structured display when browsing broad sets
  const groupedItems = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    filteredItems.forEach((item) => {
      const cat = item.category;
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(item);
    });
    return Array.from(map.entries());
  }, [filteredItems]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cart.reduce((acc, item) => {
    const priceNum = item.item.numericPrice || 0;
    return acc + priceNum * item.quantity;
  }, 0);

  const getCartQuantity = (id: string) => {
    const found = cart.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShareMenu = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Kanishka Veg Restaurant Menu',
          text: 'Explore the complete 350+ Pure Vegetarian & Jain multi-cuisine menu of Kanishka Veg Restaurant, Tardeo, Mumbai.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="revolutionary-menu-portal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080b]/95 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="revolutionary-menu-title"
    >
      {/* Outer Container with Dark Obsidian & Luxury Gold Border */}
      <div className="relative w-full h-full md:max-w-7xl md:h-[94vh] md:rounded-2xl bg-[#0c0d13] border md:border-[#d4af37]/35 shadow-2xl flex flex-col overflow-hidden">
        
        {/* ========================================================================= */}
        {/* 1. COMPACT TOP CONTROL BAR (Ultra-sleek on Mobile & Desktop) */}
        {/* ========================================================================= */}
        <header className="px-3 sm:px-6 py-2 sm:py-3 bg-[#11121a] border-b border-[#d4af37]/20 shrink-0">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand / Title */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8a6813] flex items-center justify-center text-[#0c0d12] shadow-sm">
                <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 font-bold" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2
                    id="revolutionary-menu-title"
                    className="text-xs sm:text-base font-serif-luxury font-bold text-[#f7f3eb] tracking-wide"
                  >
                    KANISHKA MENU
                  </h2>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#152a1b] text-[#4ade80] border border-[#22c55e]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span className="hidden sm:inline">Pure Veg</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Inline Search Box (Compact on Mobile) */}
            <div className="relative flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4">
              <Search className="w-3.5 h-3.5 text-[#d4af37] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 350+ dishes, dosa, paneer, falooda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 sm:py-2 rounded-full bg-[#181924] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs sm:text-sm text-[#f7f3eb] placeholder-[#8e8677] focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e8677] hover:text-[#f7f3eb] p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Actions: View Mode Switcher, Share & Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* View Mode Switcher */}
              <div className="flex items-center p-0.5 rounded-lg bg-[#181924] border border-[#d4af37]/20">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-sm'
                      : 'text-[#a9a193] hover:text-[#f7f3eb]'
                  }`}
                  title="Grid Card View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-sm'
                      : 'text-[#a9a193] hover:text-[#f7f3eb]'
                  }`}
                  title="Compact List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Share Menu on Desktop */}
              <button
                type="button"
                onClick={handleShareMenu}
                className="p-1.5 rounded-lg bg-[#181924] hover:bg-[#222332] text-[#d4af37] border border-[#d4af37]/20 transition-colors hidden md:flex items-center gap-1 text-xs"
                title="Share Menu"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#1a1b26] hover:bg-[#272838] text-[#f7f3eb] hover:text-[#e5be5a] border border-[#d4af37]/30 transition-colors text-xs font-semibold flex items-center gap-1"
                aria-label="Close digital menu"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. COMPACT SINGLE-ROW HORIZONTAL FILTER CAROUSEL (Saves 75%+ screen for menu) */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 scrollbar-none">
            {/* Mega Group Quick Pills */}
            {MEGA_GROUPS.map((group) => {
              const isActive = selectedMegaGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setSelectedMegaGroup(group.id);
                    if (group.id === 'all') {
                      setSelectedCategory('All');
                    } else if (group.id === 'jain-specials') {
                      setSelectedCategory('Jain Special');
                    } else {
                      setSelectedCategory(group.categories[0]);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b58b14] text-[#0c0d12] font-bold shadow-sm'
                      : 'bg-[#161722] text-[#c4bba9] hover:text-[#f7f3eb] hover:bg-[#1f202e] border border-[#d4af37]/15'
                  }`}
                >
                  <span className="text-xs">{group.icon}</span>
                  <span>{group.name}</span>
                </button>
              );
            })}

            {/* Quick Dietary Filters (Jain / Bestseller) */}
            <div className="flex items-center gap-1 pl-1 border-l border-[#d4af37]/20 shrink-0">
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'jain' ? 'all' : 'jain')}
                className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 ${
                  dietaryFilter === 'jain'
                    ? 'bg-[#d4af37] text-[#0c0d12] font-bold'
                    : 'bg-[#161722] text-[#c4bba9] border border-[#d4af37]/20 hover:border-[#d4af37]'
                }`}
              >
                <HeartHandshake className="w-3 h-3" />
                <span>Jain</span>
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'bestseller' ? 'all' : 'bestseller')}
                className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 ${
                  dietaryFilter === 'bestseller'
                    ? 'bg-[#d4af37] text-[#0c0d12] font-bold'
                    : 'bg-[#161722] text-[#c4bba9] border border-[#d4af37]/20 hover:border-[#d4af37]'
                }`}
              >
                <Flame className="w-3 h-3 text-[#e5be5a]" />
                <span>Popular</span>
              </button>
            </div>
          </div>
        </header>

        {/* Slim Chef Notes Strip (Minimal height) */}
        <div className="bg-[#12131d] px-3 sm:px-6 py-1 border-b border-[#d4af37]/15 text-[10px] sm:text-[11px] text-[#a9a193] flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#e5be5a] font-bold">✨ Add-ons:</span>
            <span>Butter/Ghee +₹40</span>
            <span>•</span>
            <span>Cheese/Paneer +₹50</span>
            <span>•</span>
            <span>Ice Cream Shake +₹30</span>
          </div>
          <span className="text-[10px] text-[#8e8677] shrink-0">
            <strong className="text-[#f5eedf]">{filteredItems.length}</strong> dishes
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN MENU CONTENT AREA (NOW OCCUPIES 75%+ OF DISPLAY) */}
        {/* ========================================================================= */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5 sm:space-y-6 bg-gradient-to-b from-[#0c0d13] to-[#08090d] scrollbar-thin"
        >
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-3 max-w-md mx-auto">
              <Utensils className="w-10 h-10 text-[#d4af37]/50 mx-auto" />
              <h3 className="text-xl font-serif-luxury text-[#f7f3eb]">No matching dishes found</h3>
              <p className="text-xs text-[#a9a193]">
                Try adjusting your search keywords, clearing the Jain filter, or browsing all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMegaGroup('all');
                  setSelectedCategory('All');
                  setDietaryFilter('all');
                }}
                className="px-5 py-2 rounded-full btn-gold-secondary text-xs uppercase tracking-wider font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* ========================================== */
            /* VIEW MODE 1: LUXURY GRID VIEW */
            /* ========================================== */
            groupedItems.map(([categoryName, items]) => (
              <section key={categoryName} className="space-y-4">
                {/* Category Section Header */}
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <h3 className="text-sm sm:text-lg font-serif-luxury font-semibold text-[#f7f3eb]">
                      {categoryName}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-[#1a1b26] text-[#d4af37] border border-[#d4af37]/20">
                      {items.length} dishes
                    </span>
                  </div>
                </div>

                {/* Grid of Dishes (Medium Sized for Clear Visibility on Mobile & Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {items.map((dish) => {
                    const qty = getCartQuantity(dish.id);
                    return (
                      <div
                        key={dish.id}
                        id={`dish-card-${dish.id}`}
                        className="rounded-xl p-3 sm:p-4 bg-[#12131c]/95 border border-[#d4af37]/20 hover:border-[#d4af37]/50 shadow-sm flex flex-col justify-between space-y-2 group transition-all"
                      >
                        <div className="space-y-1.5">
                          {/* Badges line */}
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="w-3 h-3 rounded-sm border border-[#22c55e] flex items-center justify-center p-[1px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                              </span>
                              {dish.isJain && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#262013] text-[#f3cf70] border border-[#d4af37]/30">
                                  Jain
                                </span>
                              )}
                              {dish.spicyLevel && dish.spicyLevel > 0 && (
                                <span className="text-[10px] text-[#ef4444] flex items-center font-bold">
                                  {'🌶️'.repeat(dish.spicyLevel)}
                                </span>
                              )}
                            </div>

                            {dish.isBestseller && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-[#e5be5a] uppercase tracking-wider flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37]" /> Popular
                              </span>
                            )}
                          </div>

                          {/* Dish Name & Price */}
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-[13.5px] sm:text-base font-semibold text-[#f7f3eb] group-hover:text-[#f3cf70] transition-colors leading-tight">
                              {dish.name}
                            </h4>
                            <span className="text-[13.5px] sm:text-base font-bold text-[#e5be5a] whitespace-nowrap">
                              {dish.price}
                            </span>
                          </div>

                          {/* Dish Description */}
                          <p className="text-[11px] sm:text-xs text-[#b3aaa0] font-light leading-snug line-clamp-2">
                            {dish.description}
                          </p>
                        </div>

                        {/* Card Action Controls */}
                        <div className="pt-1.5 border-t border-[#d4af37]/10 flex items-center justify-between gap-2">
                          {/* Add / Quantity Button */}
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => onAddToCart(dish)}
                              className="px-2.5 py-1.5 rounded-lg btn-gold-secondary text-[11px] sm:text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 flex-1 justify-center active:scale-95 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                              <span>Add to Order</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 bg-[#171824] border border-[#d4af37]/40 rounded-lg p-1 flex-1 justify-between px-2">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(dish.id, -1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#222332] hover:bg-[#2d2e40] text-[#f7f3eb] flex items-center justify-center font-bold text-xs"
                                title="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-[#f7f3eb]">{qty} Added</span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(dish.id, 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#d4af37] text-[#0c0d12] hover:bg-[#f3cf70] flex items-center justify-center font-bold text-xs"
                                title="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {/* Instant 1-Click WhatsApp Item Order */}
                          <a
                            href={buildWhatsAppOrderLink([{ name: dish.name, quantity: 1, price: dish.price }])}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 sm:p-2 rounded-lg bg-[#181924] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0c0d12] transition-colors"
                            title={`Order ${dish.name} directly on WhatsApp`}
                          >
                            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            /* ========================================== */
            /* VIEW MODE 2: REVOLUTIONARY RATE CARD LIST VIEW */
            /* ========================================== */
            groupedItems.map(([categoryName, items]) => (
              <section key={categoryName} className="space-y-1.5">
                <div className="bg-[#141520] px-3 py-1.5 rounded-lg border-l-2 border-[#d4af37] flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f7f3eb]">
                    {categoryName}
                  </h3>
                  <span className="text-[10px] text-[#a9a193] font-mono">{items.length} items</span>
                </div>

                <div className="divide-y divide-[#d4af37]/10 bg-[#101119] rounded-xl border border-[#d4af37]/15 overflow-hidden">
                  {items.map((dish) => {
                    const qty = getCartQuantity(dish.id);
                    return (
                      <div
                        key={dish.id}
                        className="px-3 py-2 sm:py-2.5 flex items-center justify-between gap-2 hover:bg-[#161723] transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm border border-[#22c55e] flex items-center justify-center p-[1px] shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-[#f7f3eb] truncate">{dish.name}</span>
                            {dish.isJain && (
                              <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-[#262013] text-[#f3cf70] shrink-0">
                                Jain
                              </span>
                            )}
                            {dish.isBestseller && (
                              <span className="text-[9px] text-[#e5be5a] font-bold shrink-0">★ Top</span>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-xs text-[#8e8677] truncate pl-4">{dish.description}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-[#e5be5a]">{dish.price}</span>

                          {/* Controls */}
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => onAddToCart(dish)}
                              className="px-2 py-1 rounded bg-[#1c1d2b] hover:bg-[#d4af37] hover:text-[#0c0d12] text-[#d4af37] border border-[#d4af37]/30 text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 bg-[#171824] border border-[#d4af37]/40 rounded p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(dish.id, -1)}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#222332] text-[#f7f3eb] flex items-center justify-center text-[10px]"
                              >
                                -
                              </button>
                              <span className="text-[10px] font-bold px-1 text-[#f7f3eb]">{qty}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(dish.id, 1)}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#d4af37] text-[#0c0d12] flex items-center justify-center text-[10px] font-bold"
                              >
                                +
                              </button>
                            </div>
                          )}

                          <a
                            href={buildWhatsAppOrderLink([{ name: dish.name, quantity: 1, price: dish.price }])}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-[#171824] text-[#d4af37] hover:text-[#22c55e]"
                            title="Order on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}

          {/* Quick Scroll to Top button at end */}
          <div className="pt-6 pb-12 text-center">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#161723] hover:bg-[#202130] text-xs font-semibold text-[#d4af37] border border-[#d4af37]/20 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top of Menu</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM FLOATING CART / WHATSAPP ORDER BAR (WHEN ITEMS SELECTED) */}
        {/* ========================================================================= */}
        {totalCartCount > 0 && (
          <footer className="px-4 py-3 bg-[#11121a] border-t border-[#d4af37]/35 shadow-2xl flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d4af37] text-[#0c0d12] flex items-center justify-center font-bold text-sm shadow-md">
                {totalCartCount}
              </div>
              <div>
                <p className="text-xs text-[#a9a193]">Selected for WhatsApp Order</p>
                <p className="text-sm font-bold text-[#f7f3eb]">
                  {totalCartCount} Items Selected • <span className="text-[#e5be5a]">Est. ₹{totalCartValue}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenOrderDrawer}
                className="px-4 py-2.5 rounded-full btn-gold-primary text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Review & Order on WhatsApp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
