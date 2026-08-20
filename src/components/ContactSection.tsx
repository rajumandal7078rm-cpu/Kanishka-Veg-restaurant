import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppOrderLink } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#0a0b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181923] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Phone className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Contact & Enquiries
          </h2>

          <p className="text-sm sm:text-base text-[#b8b0a1] font-light">
            We are here to assist with takeaway orders, table inquiries, catering requests, and Jain dining specifications.
          </p>
        </div>

        {/* 4 Clean Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phone Card */}
          <div className="luxury-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#181923] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Phone Enquiries
              </h4>
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
                className="text-base font-semibold text-[#f5eedf] hover:text-[#d4af37] transition-colors block mt-1"
              >
                {BUSINESS_INFO.primaryPhone}
              </a>
              <p className="text-xs text-[#a9a193] mt-0.5">Direct Restaurant Landline</p>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase hover:underline"
            >
              Call Landline →
            </a>
          </div>

          {/* WhatsApp & Mobile Card */}
          <div className="luxury-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#181923] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                WhatsApp & Mobile
              </h4>
              <a
                href={buildWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#f5eedf] hover:text-[#d4af37] transition-colors block mt-1"
              >
                {BUSINESS_INFO.mobile}
              </a>
              <p className="text-xs text-[#a9a193] mt-0.5">Quick WhatsApp Ordering</p>
            </div>
            <a
              href={buildWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </div>

          {/* Address Card */}
          <div className="luxury-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#181923] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Location
              </h4>
              <p className="text-xs text-[#ded8cb] mt-1 line-clamp-2 leading-relaxed">
                Shop No. 5/B, 1st Floor, Tardeo Road, Haji Ali Circle, Opposite Heera Panna Shopping Centre
              </p>
              <p className="text-[11px] text-[#a9a193] mt-0.5">Mumbai – 400034</p>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase hover:underline"
            >
              Get Directions →
            </a>
          </div>

          {/* Hours Card */}
          <div className="luxury-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#181923] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Open All 7 Days
              </h4>
              <p className="text-base font-semibold text-[#f5eedf] mt-1">
                9:00 AM – 12:00 AM
              </p>
              <p className="text-xs text-[#a9a193] mt-0.5">Breakfast to Late Dinner</p>
            </div>
            <a
              href="#hours"
              className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase hover:underline"
            >
              View Meal Timings →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
