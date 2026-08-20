import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Sun, Coffee, Sunset, Moon, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, getRestaurantStatus } from '../data/restaurantData';

export const OpeningHoursSection: React.FC = () => {
  const [status, setStatus] = useState(getRestaurantStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const slotIcons = [
    { name: 'Breakfast', icon: Coffee },
    { name: 'Lunch', icon: Sun },
    { name: 'Evening Snacks / Light Meals', icon: Sunset },
    { name: 'Dinner', icon: Moon },
  ];

  return (
    <section id="hours" className="relative py-20 lg:py-24 bg-[#0a0b0f] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181923] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Serving All Seven Days</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Opening Hours & Meal Timings
          </h2>

          <p className="text-sm sm:text-base text-[#b8b0a1] font-light">
            We are open 7 days a week from morning until midnight. Visit us for freshly prepared vegetarian delicacies throughout the day.
          </p>

          {/* Dynamic Live Status Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14151f] border border-[#d4af37]/40 shadow-lg mt-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#f5eedf]">
              {status.statusText}
            </span>
          </div>
        </div>

        {/* 4 Meal Timing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BUSINESS_INFO.mealTimings.map((slot, idx) => {
            const Icon = slotIcons[idx]?.icon || Clock;
            const isCurrentSlot = status.currentMealSlot?.name === slot.name;

            return (
              <div
                key={slot.name}
                className={`luxury-card rounded-2xl p-6 relative overflow-hidden transition-all ${
                  isCurrentSlot
                    ? 'border-[#d4af37] bg-gradient-to-b from-[#1e1f2b] to-[#12131b] shadow-xl shadow-[#d4af37]/10 ring-1 ring-[#d4af37]/50'
                    : ''
                }`}
              >
                {isCurrentSlot && (
                  <span className="absolute top-0 right-0 bg-[#d4af37] text-[#0c0d12] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-md">
                    Active Now
                  </span>
                )}

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#181923] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-serif-luxury font-medium text-[#f5eedf]">
                      {slot.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#e5be5a] tracking-wider mt-0.5">
                      {slot.timeRange}
                    </p>
                  </div>

                  <p className="text-xs text-[#a9a193] font-light leading-relaxed">
                    {slot.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Banner */}
        <div className="mt-8 text-center p-4 rounded-xl bg-[#12131a] border border-[#d4af37]/15 text-xs text-[#c4bba9] max-w-2xl mx-auto flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#38a169]" />
          <span>Continuous pure vegetarian kitchen service from <strong>9:00 AM to 12:00 AM</strong> everyday.</span>
        </div>
      </div>
    </section>
  );
};
