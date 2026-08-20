import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Sparkles,
  Utensils,
  AlertCircle,
  MapPin,
  Phone,
  User,
  Navigation,
  Check,
  Compass,
} from 'lucide-react';
import { CartItem } from '../types';
import { BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';
import { detectUserLiveLocation } from '../utils/locationHelper';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Geolocation state
  const [gpsLocation, setGpsLocation] = useState<{
    lat: number;
    lng: number;
    accuracy?: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Load saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kanishka_delivery_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setCustomerName(parsed.name);
        if (parsed.phone) setCustomerPhone(parsed.phone);
        if (parsed.address) setCustomerAddress(parsed.address);
      }
    } catch (e) {
      console.warn('Could not load saved address details', e);
    }
  }, []);

  const saveProfile = () => {
    try {
      localStorage.setItem(
        'kanishka_delivery_profile_v1',
        JSON.stringify({
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
        })
      );
    } catch (e) {
      console.warn(e);
    }
  };

  const handleGetLiveLocation = async () => {
    setGpsError(null);
    setIsLocating(true);

    try {
      const loc = await detectUserLiveLocation();
      setGpsLocation({
        lat: loc.lat,
        lng: loc.lng,
        accuracy: loc.accuracy,
      });
      setIsLocating(false);

      if (!customerAddress.trim()) {
        if (loc.area) {
          setCustomerAddress(`${loc.area}, Mumbai • Map Pin: https://maps.google.com/?q=${loc.lat},${loc.lng}`);
        } else {
          setCustomerAddress(`Live Location Pin: https://maps.google.com/?q=${loc.lat},${loc.lng}`);
        }
      }
    } catch (err) {
      setIsLocating(false);
      setGpsError('Could not auto-detect location. Please type your delivery address or pick on Google Maps.');
    }
  };

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSendWhatsApp = () => {
    saveProfile();

    const formattedItems = cart.map((c) => ({
      name: c.item.name,
      quantity: c.quantity,
      price: c.item.price,
    }));

    const gpsLink = gpsLocation
      ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`
      : undefined;

    const link = buildWhatsAppOrderLink(formattedItems, customerNotes, {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      gpsLink: gpsLink,
    });

    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="order-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#07080b]/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="order-drawer-content"
        className="w-full max-w-md bg-[#0e0f16] border-l border-[#d4af37]/30 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#12131b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif-luxury font-medium text-[#f5eedf]">
                Your Order Draft
              </h3>
              <p className="text-xs text-[#a9a193]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for WhatsApp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181924] text-[#a9a193] hover:text-[#f5eedf] hover:bg-[#222433] transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List & Address Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Utensils className="w-10 h-10 text-[#d4af37] mx-auto opacity-50" />
              <h4 className="text-base font-serif-luxury text-[#f5eedf]">Your draft is currently empty</h4>
              <p className="text-xs text-[#a9a193] max-w-xs mx-auto">
                Explore our menu to add South Indian dosas, Punjabi curries, pav bhaji, or Jain specialties.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-5 py-2 rounded-full btn-gold-primary text-xs uppercase tracking-wider font-semibold"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Selected Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d4af37]/10">
                  <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                    Selected Items ({totalItems})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-[#ef4444] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="divide-y divide-[#d4af37]/10 space-y-3">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="pt-3 flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-[#f5eedf] font-serif-luxury">
                            {item.name}
                          </h4>
                          {item.isJain && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#272111] text-[#f3cf70] border border-[#d4af37]/20">
                              Jain
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#e5be5a] font-semibold">{item.price}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-[#171822] border border-[#d4af37]/30 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded bg-[#20212d] hover:bg-[#2b2d3d] text-[#f5eedf] flex items-center justify-center"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#f5eedf] px-1">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded bg-[#d4af37] text-[#0c0d12] hover:bg-[#f3cf70] flex items-center justify-center font-bold"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions Note Input */}
              <div className="space-y-1.5 pt-2 border-t border-[#d4af37]/15">
                <label htmlFor="customer-notes" className="text-xs font-semibold text-[#ded8cb] uppercase tracking-wider block">
                  Dietary / Preparation Notes (Optional)
                </label>
                <textarea
                  id="customer-notes"
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g. Jain preparation, less spicy, extra butter, no onion/garlic..."
                  className="w-full p-2.5 rounded-xl bg-[#14151e] border border-[#d4af37]/20 text-xs text-[#f5eedf] placeholder-[#81796d] focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* ========================================================================= */}
              {/* DELIVERY ADDRESS & 1-CLICK LIVE LOCATION FORM */}
              {/* ========================================================================= */}
              <div className="p-4 rounded-2xl bg-[#12131d] border border-[#d4af37]/30 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e5be5a]">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Delivery Address Details</span>
                  </div>

                  {/* 1-Click Live Location Trigger */}
                  <button
                    type="button"
                    onClick={handleGetLiveLocation}
                    disabled={isLocating}
                    className="px-2.5 py-1 rounded-lg bg-[#192b1e] hover:bg-[#233f2c] border border-[#22c55e]/40 text-[#86efac] hover:text-[#ffffff] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 shrink-0"
                    title="Auto-detect current GPS location"
                  >
                    {isLocating ? (
                      <>
                        <div className="w-3 h-3 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
                        <span>Detecting...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3 h-3 text-[#22c55e]" />
                        <span>1-Click Live Location</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GPS Status Banner */}
                {gpsLocation && (
                  <div className="p-2 rounded-lg bg-[#16271c] border border-[#22c55e]/50 flex items-center justify-between text-[11px] text-[#86efac]">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                      <span>
                        GPS Pin: <strong className="font-mono text-[#4ade80]">{gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)}</strong>
                      </span>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#e5be5a] hover:underline flex items-center gap-0.5"
                    >
                      <Compass className="w-3 h-3" />
                      <span>View Pin</span>
                    </a>
                  </div>
                )}

                {gpsError && (
                  <p className="text-[10px] text-[#f87171]">{gpsError}</p>
                )}

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label htmlFor="drawer-name" className="text-[11px] font-semibold text-[#a9a193] uppercase tracking-wider block">
                      Name:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#756f64]">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="drawer-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#181926] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs text-[#f5eedf] placeholder-[#6d665b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="drawer-phone" className="text-[11px] font-semibold text-[#a9a193] uppercase tracking-wider block">
                      Number:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#756f64]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="drawer-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#181926] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs text-[#f5eedf] placeholder-[#6d665b] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="drawer-address" className="text-[11px] font-semibold text-[#a9a193] uppercase tracking-wider block">
                      Address:
                    </label>
                    <span className="text-[9px] text-[#8e8677]">Building / Flat / Street</span>
                  </div>
                  <div className="relative">
                    <div className="absolute top-2.5 left-2.5 pointer-events-none text-[#756f64]">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <textarea
                      id="drawer-address"
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g. Flat 301, Tardeo Chambers, near Haji Ali..."
                      className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#181926] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs text-[#f5eedf] placeholder-[#6d665b] outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Quick Area Tags */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span className="text-[9px] uppercase font-bold text-[#7d766b]">Quick Add:</span>
                  {['Tardeo', 'Haji Ali', 'Mahalaxmi', 'Pedder Rd', 'Girgaon', 'Worli'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() =>
                        setCustomerAddress((prev) =>
                          prev ? `${prev}, ${loc}, Mumbai` : `${loc}, Mumbai`
                        )
                      }
                      className="px-1.5 py-0.5 rounded bg-[#1c1d2c] hover:bg-[#282a3d] border border-[#d4af37]/15 text-[9px] text-[#ded8cb] hover:text-[#e5be5a] transition-colors"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informational WhatsApp strip */}
              <div className="p-3 rounded-xl bg-[#14151e] border border-[#d4af37]/15 flex items-start gap-2 text-xs text-[#a9a193]">
                <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  Clicking below will launch WhatsApp with your itemized order, delivery address & live GPS pin to <strong>{BUSINESS_INFO.whatsapp}</strong>.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#d4af37]/20 bg-[#12131b] space-y-2.5">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 rounded-xl btn-gold-primary text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Order on WhatsApp ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
            </button>

            <p className="text-[11px] text-center text-[#827a6f]">
              Delivery & takeaway available across South Mumbai • Open 9 AM – 12 AM
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
