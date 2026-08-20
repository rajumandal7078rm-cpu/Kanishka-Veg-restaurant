import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  User,
  Navigation,
  MessageCircle,
  Check,
  Sparkles,
  Compass,
  AlertCircle,
  Copy,
  Send,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { detectUserLiveLocation } from '../utils/locationHelper';

interface QuickDeliveryAddressFormProps {
  className?: string;
}

export const QuickDeliveryAddressForm: React.FC<QuickDeliveryAddressFormProps> = ({
  className = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  // Geolocation state
  const [gpsLocation, setGpsLocation] = useState<{
    lat: number;
    lng: number;
    accuracy?: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  // Load saved details on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kanishka_delivery_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.address) setAddress(parsed.address);
      }
    } catch (e) {
      console.warn('Could not load saved address details', e);
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = (newName: string, newPhone: string, newAddress: string) => {
    try {
      localStorage.setItem(
        'kanishka_delivery_profile_v1',
        JSON.stringify({ name: newName, phone: newPhone, address: newAddress })
      );
      setSavedLocally(true);
      setTimeout(() => setSavedLocally(false), 2500);
    } catch (e) {
      console.warn(e);
    }
  };

  // 1-Click Live Location Detection (Multi-tier with instant IP fallback)
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

      // Auto-fill coordinates in address note if address is empty
      if (!address.trim()) {
        if (loc.area) {
          setAddress(`${loc.area}, Mumbai • Live Map Pin: https://maps.google.com/?q=${loc.lat},${loc.lng}`);
        } else {
          setAddress(`Live Location Pin: https://maps.google.com/?q=${loc.lat},${loc.lng}`);
        }
      }
    } catch (err) {
      setIsLocating(false);
      setGpsError('Unable to auto-detect location. Please type your delivery address.');
    }
  };

  // Generate WhatsApp Message with Address & Live Location Link
  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('Please enter your Name and Phone Number.');
      return;
    }

    if (!address.trim() && !gpsLocation) {
      alert('Please enter your Delivery Address or click "Share 1-Click Live Location".');
      return;
    }

    saveProfile(name, phone, address);

    const mapsLink = gpsLocation
      ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`
      : '';

    let message = `*KANISHKA VEG RESTAURANT - DELIVERY ADDRESS*\n\n`;
    message += `👤 *Customer Name:* ${name.trim()}\n`;
    message += `📞 *Contact Number:* ${phone.trim()}\n`;
    
    if (address.trim()) {
      message += `📍 *Delivery Address:* ${address.trim()}\n`;
    }

    if (mapsLink) {
      message += `🗺️ *Live Google Location Pin:*\n${mapsLink}\n`;
    }

    if (notes.trim()) {
      message += `📝 *Delivery Landmark / Note:* ${notes.trim()}\n`;
    }

    message += `\n*Restaurant Destination:* Kanishka Veg Restaurant, Opp. Heera Panna, Tardeo Rd, Haji Ali Circle, Mumbai.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy Live GPS Link
  const handleCopyGpsLink = () => {
    if (!gpsLocation) return;
    const mapsLink = `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`;
    navigator.clipboard.writeText(mapsLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <div
      id="quick-delivery-address-section"
      className={`luxury-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-[#d4af37]/35 shadow-2xl relative overflow-hidden bg-[#11121a] ${className}`}
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22c55e]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#d4af37]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181926] border border-[#d4af37]/30 text-[#e5be5a] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-[#e5be5a]" />
            <span>Doorstep Food Delivery Details</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#f7f3eb]">
            Delivery Address & 1-Click Live Location
          </h3>
          <p className="text-xs sm:text-sm text-[#b8b0a1] mt-1 font-light">
            Enter your delivery address below or share your live Google Maps location pin directly with Kanishka on WhatsApp.
          </p>
        </div>

        {/* 1-Click GPS Button Highlight */}
        <button
          type="button"
          onClick={handleGetLiveLocation}
          disabled={isLocating}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1b2b1e] to-[#122416] hover:from-[#233b27] hover:to-[#17301c] border border-[#22c55e]/50 text-[#86efac] hover:text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 shrink-0 self-start sm:self-auto"
          title="Detect GPS location automatically"
        >
          {isLocating ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
              <span>Detecting GPS Pin...</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 text-[#22c55e] animate-pulse" />
              <span>1-Click Live Location</span>
            </>
          )}
        </button>
      </div>

      {/* GPS Location Status Banner (if detected or error) */}
      {gpsLocation && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#142318] border border-[#22c55e]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs text-[#86efac]">
            <Check className="w-4 h-4 text-[#22c55e] shrink-0" />
            <div>
              <span className="font-bold text-[#f5eedf]">Live GPS Pin Captured:</span>{' '}
              <span className="font-mono text-[11px] text-[#4ade80]">
                {gpsLocation.lat.toFixed(5)}, {gpsLocation.lng.toFixed(5)}
              </span>
              {gpsLocation.accuracy && (
                <span className="text-[10px] text-[#a7f3d0] ml-1.5 font-sans">
                  (±{gpsLocation.accuracy}m precision)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-[#e5be5a] hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>View Pin on Map</span>
            </a>

            <button
              type="button"
              onClick={handleCopyGpsLink}
              className="px-2.5 py-1 rounded bg-[#1c3322] hover:bg-[#284a30] text-[#86efac] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      )}

      {gpsError && (
        <div className="mt-4 p-3 rounded-xl bg-[#2a1316] border border-[#ef4444]/40 flex items-center gap-2.5 text-xs text-[#fca5a5] animate-fade-in">
          <AlertCircle className="w-4 h-4 text-[#f87171] shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Main Address Form */}
      <form onSubmit={handleSendToWhatsApp} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Customer Name */}
          <div className="space-y-1.5">
            <label htmlFor="customer-name" className="block text-xs font-semibold uppercase tracking-wider text-[#e5be5a]">
              Your Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a9a193]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="customer-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171824] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#f7f3eb] placeholder-[#7d766b] outline-none transition-all"
              />
            </div>
          </div>

          {/* 2. Contact Number */}
          <div className="space-y-1.5">
            <label htmlFor="customer-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#e5be5a]">
              Mobile / WhatsApp Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a9a193]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="customer-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98205 12345"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171824] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#f7f3eb] placeholder-[#7d766b] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. Full Delivery Address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="delivery-address" className="block text-xs font-semibold uppercase tracking-wider text-[#e5be5a]">
              Full Delivery Address & Flat / Building *
            </label>
            <span className="text-[10px] text-[#a9a193]">South Mumbai delivery areas</span>
          </div>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#a9a193]">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              id="delivery-address"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Flat 402, Heera Panna Building, Haji Ali, Tardeo Road, Mumbai - 400034"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171824] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#f7f3eb] placeholder-[#7d766b] outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Quick Area Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-[#8e8677] mr-1">Quick Add:</span>
          {['Tardeo', 'Haji Ali', 'Mahalaxmi', 'Pedder Road', 'Breach Candy', 'Girgaon', 'Worli'].map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => {
                setAddress((prev) => (prev ? `${prev}, ${area}, Mumbai` : `${area}, Mumbai`));
              }}
              className="px-2.5 py-1 rounded-lg bg-[#191a27] hover:bg-[#242637] border border-[#d4af37]/20 text-[10px] text-[#ded8cb] hover:text-[#e5be5a] transition-all"
            >
              + {area}
            </button>
          ))}
        </div>

        {/* Optional Landmark / Note */}
        <div className="space-y-1.5 pt-1">
          <label htmlFor="delivery-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#a9a193]">
            Delivery Landmark / Note (Optional)
          </label>
          <input
            id="delivery-notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Near Heera Panna Mall entrance, Ring bell twice"
            className="w-full px-4 py-2.5 rounded-xl bg-[#171824] border border-[#d4af37]/20 focus:border-[#d4af37] text-xs text-[#f7f3eb] placeholder-[#7d766b] outline-none transition-all"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          <div className="flex items-center gap-2 text-xs text-[#a9a193] self-start sm:self-auto">
            {savedLocally ? (
              <span className="text-[#22c55e] flex items-center gap-1 text-[11px] font-semibold">
                <Check className="w-3.5 h-3.5" /> Details saved for future orders
              </span>
            ) : (
              <span className="text-[11px]">Auto-saved locally for quick 1-click re-ordering</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="submit-address-whatsapp-btn"
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl btn-gold-primary text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Share Address & Order on WhatsApp</span>
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
