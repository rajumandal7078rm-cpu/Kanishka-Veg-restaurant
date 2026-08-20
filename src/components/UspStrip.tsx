import React from 'react';
import { Leaf, HeartHandshake, UtensilsCrossed, Clock, Bike } from 'lucide-react';

export const UspStrip: React.FC = () => {
  const usps = [
    {
      icon: Leaf,
      title: '100% Pure Veg',
      description: 'Strictly pure vegetarian kitchen with premium ingredients and mindful hygiene.',
    },
    {
      icon: HeartHandshake,
      title: 'Jain Food Available',
      description: 'Dedicated Jain preparations without onion, garlic, or underground root vegetables.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Multi-Cuisine Dining',
      description: 'South Indian, Punjabi, Chinese, Pav Bhaji, Sandwiches, Shakes & Juices in one place.',
    },
    {
      icon: Clock,
      title: '9:00 AM – 12:00 AM',
      description: 'Open all seven days for breakfast, lunch, evening snacks, and late dinner.',
    },
    {
      icon: Bike,
      title: 'Delivery & Pickup',
      description: 'Quick WhatsApp and phone ordering with fast takeaway & South Mumbai delivery.',
    },
  ];

  return (
    <section id="usp-strip" className="relative py-8 bg-[#0e0f15] border-y border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div
                key={idx}
                className="luxury-card rounded-xl p-4.5 flex flex-col items-start space-y-2.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1a1b24] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] group-hover:text-[#f3cf70] group-hover:border-[#d4af37]/60 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5eedf] font-sans tracking-wide">
                    {usp.title}
                  </h4>
                  <p className="text-xs text-[#a9a193] mt-1 leading-relaxed">
                    {usp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
