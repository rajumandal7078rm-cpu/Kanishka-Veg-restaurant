import React from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, RESTAURANT_IMAGES, buildWhatsAppOrderLink } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-20 lg:py-28 bg-[#0c0d12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181923] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>South Mumbai Landmark</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Visit Us in Tardeo
          </h2>

          <p className="text-sm sm:text-base text-[#b8b0a1] font-light">
            Conveniently situated right at Haji Ali Circle on Tardeo Road, directly opposite Heera Panna Shopping Centre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card */}
          <div className="lg:col-span-5 luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Restaurant Building Facade Preview (With Upload Option) */}
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-72 min-h-[260px] sm:min-h-[290px] rounded-xl overflow-hidden border border-[#d4af37]/35 shadow-xl bg-[#12131b] group">
                <UploadableImage
                  imageKey="location-facade"
                  defaultSrc={RESTAURANT_IMAGES.facadeSignboard}
                  alt="Kanishka Veg Restaurant Exterior Facade & Signboard"
                  label="Upload Signboard Photo"
                  badgePosition="top-right"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  containerClassName="relative w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/90 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#0c0d12]/90 text-[#e5be5a] px-3 py-1 rounded-lg border border-[#d4af37]/40 shadow-md">
                    Exterior Signboard
                  </span>
                  <span className="text-[11px] font-medium text-[#f5eedf] bg-[#0c0d12]/85 px-2.5 py-1 rounded border border-white/10">
                    1st Floor Entrance
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1a1b24] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    Primary Address
                  </h4>
                  <p className="text-sm sm:text-base text-[#f5eedf] mt-1 font-medium leading-snug">
                    {BUSINESS_INFO.addressPrimary}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14151e] border border-[#d4af37]/15">
                <h5 className="text-[11px] uppercase tracking-wider text-[#a9a193] font-semibold">
                  Landmark Directions
                </h5>
                <p className="text-xs text-[#ded8cb] mt-0.5">
                  {BUSINESS_INFO.landmark} • Opposite Heera Panna Shopping Centre
                </p>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-[#d4af37]/10">
                <div className="w-10 h-10 rounded-xl bg-[#1a1b24] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    Operating Hours
                  </h4>
                  <p className="text-sm text-[#f5eedf] mt-0.5">
                    Monday – Sunday: 9:00 AM – 12:00 AM
                  </p>
                  <p className="text-xs text-[#a9a193]">
                    Open All 7 Days • Dine-in, Takeaway & Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-[#d4af37]/10">
                <div className="w-10 h-10 rounded-xl bg-[#1a1b24] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    Direct Telephone
                  </h4>
                  <p className="text-sm text-[#f5eedf] mt-0.5">
                    Landline: {BUSINESS_INFO.primaryPhone}
                  </p>
                  <p className="text-xs text-[#a9a193]">
                    Mobile / WhatsApp: {BUSINESS_INFO.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Direction & Call Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4">
              <a
                id="location-get-directions-btn"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl btn-gold-primary text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 text-center"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>

              <a
                id="location-call-btn"
                href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
                className="py-3 px-3 rounded-xl btn-gold-secondary text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Call Now</span>
              </a>

              <a
                id="location-whatsapp-btn"
                href={buildWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-[#161722] hover:bg-[#212230] border border-[#d4af37]/30 text-[#f5eedf] text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 text-center transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#d4af37] fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual with Direct Google Maps Link */}
          <div className="lg:col-span-7 luxury-card rounded-2xl overflow-hidden relative flex flex-col min-h-[380px] sm:min-h-[440px] border border-[#d4af37]/30">
            {/* Map Frame Overlay Header */}
            <div className="p-4 bg-[#12131a] border-b border-[#d4af37]/15 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#f5eedf]">
                  Google Maps Location • Haji Ali Circle
                </span>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Interactive Map Container */}
            <div className="relative flex-1 w-full bg-[#181923] flex items-center justify-center overflow-hidden">
              <iframe
                title="Kanishka Veg Restaurant Google Map"
                src="https://maps.google.com/maps?q=18.9723,72.8126&z=16&output=embed"
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Direct Overlay Card to Trigger Google Maps */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm backdrop-blur-md bg-[#0c0d12]/90 border border-[#d4af37]/35 rounded-xl p-3.5 shadow-2xl">
                <h5 className="text-xs font-bold text-[#f5eedf]">KANISHKA VEG. RESTAURANT</h5>
                <p className="text-[11px] text-[#a9a193] mt-0.5">
                  1st Floor, Opp. Heera Panna, Tardeo Rd, Haji Ali Circle, Mumbai
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#d4af37] uppercase tracking-wider hover:underline"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Start Navigation to Restaurant</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
