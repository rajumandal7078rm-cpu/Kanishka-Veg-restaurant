import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UspStrip } from './components/UspStrip';
import { AboutStory } from './components/AboutStory';
import { SignatureDishes } from './components/SignatureDishes';
import { JainSpecialSection } from './components/JainSpecialSection';
import { GallerySection } from './components/GallerySection';
import { OpeningHoursSection } from './components/OpeningHoursSection';
import { LocationSection } from './components/LocationSection';
import { OrderingCtaSection } from './components/OrderingCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { OrderDrawer } from './components/OrderDrawer';
import { RevolutionaryMenuModal } from './components/RevolutionaryMenuModal';
import { CustomImageProvider } from './context/CustomImageContext';
import { CartItem, MenuCategory, MenuItem } from './types';
import { Utensils, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuModalCategory, setMenuModalCategory] = useState<MenuCategory>('All');

  const handleOpenMenuModal = (category: MenuCategory = 'All') => {
    setMenuModalCategory(category);
    setIsMenuModalOpen(true);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => {
    return cart.some((c) => c.item.id === id);
  };

  return (
    <CustomImageProvider>
      <div className="min-h-screen bg-[#0c0d12] text-[#ede8df] font-sans selection:bg-[#d4af37]/30 selection:text-[#ffffff] relative pb-20 md:pb-0">
        {/* Sticky Header with Live Status & Quick Cart Trigger */}
        <Navbar
          cart={cart}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenMenuModal={handleOpenMenuModal}
        />

        {/* Main Page Layout Flow */}
        <main>
          {/* 1. Cinematic Hero Section */}
          <Hero onOpenMenuModal={handleOpenMenuModal} />

          {/* 2. USP / Premium Feature Strip */}
          <UspStrip />

          {/* 3. Editorial Restaurant Story */}
          <AboutStory onOpenMenuModal={handleOpenMenuModal} />

          {/* 4. Signature Specialties Cards */}
          <SignatureDishes
            onAddToCart={handleAddToCart}
            isInCart={isInCart}
          />

          {/* 5. Dedicated Jain Specialities Section */}
          <JainSpecialSection
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onOpenMenuModal={handleOpenMenuModal}
          />

          {/* 6. Restaurant Visual Gallery with Lightbox */}
          <GallerySection />

          {/* 7. Live Opening Hours & Meal Timings Schedule */}
          <OpeningHoursSection />

          {/* 8. Location, Address & Google Maps */}
          <LocationSection />

          {/* 9. Conversion Ordering Banner */}
          <OrderingCtaSection />

          {/* 10. Contact Details & Direct Enquiries */}
          <ContactSection />
        </main>

        {/* Luxury Multi-Column Footer with bottom clearance for floating bar */}
        <Footer onOpenMenuModal={handleOpenMenuModal} />

        {/* 14. Floating Desktop & Mobile Quick Menu Trigger Button (FAB) */}
        <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
          <button
            type="button"
            onClick={() => handleOpenMenuModal('All')}
            className="group px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3cf70] to-[#c59a22] text-[#0c0d12] font-extrabold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-[#fef08a]/50"
            aria-label="Open Revolutionary Digital Menu"
          >
            <Utensils className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Explore Menu (350+)</span>
            <span className="sm:hidden">Menu</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 15. Floating bottom action bar for mobile devices featuring CALL, WHATSAPP, MENU, and DIRECTIONS */}
        <MobileActionBar
          cart={cart}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenMenuModal={() => handleOpenMenuModal('All')}
        />

        {/* 16. Slide-Over WhatsApp Order Draft Drawer */}
        <OrderDrawer
          isOpen={isOrderDrawerOpen}
          onClose={() => setIsOrderDrawerOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* 17. REVOLUTIONARY INTERACTIVE DIGITAL MENU MODAL */}
        <RevolutionaryMenuModal
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalOpen(false)}
          initialCategory={menuModalCategory}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateQuantity}
          onOpenOrderDrawer={() => {
            setIsMenuModalOpen(false);
            setIsOrderDrawerOpen(true);
          }}
        />
      </div>
    </CustomImageProvider>
  );
}
