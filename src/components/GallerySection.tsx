import React, { useState } from 'react';
import { Sparkles, X, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { UploadableImage } from './UploadableImage';
import { useCustomImages } from '../context/CustomImageContext';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; category: string; description?: string } | null>(null);
  const { getImage } = useCustomImages();

  const filters = ['All', 'Ambience', 'Signature', 'Starters & Drinks', 'Desserts', 'Experiences'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase().includes(activeFilter.toLowerCase()) || (item.category === 'Starters & Drinks' && activeFilter.includes('Drinks')));

  return (
    <section id="gallery" className="relative py-16 lg:py-24 bg-[#0c0d12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181922] border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f7f3eb]">
            Dining & <span className="text-[#e5be5a] italic">Culinary Moments</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a9a193] font-light">
            A glimpse into our comfortable dining atmosphere, chef's live kitchen cooking, and delicious pure vegetarian spread.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-md'
                    : 'bg-[#14151e] text-[#c4bba9] hover:text-[#ffffff] border border-[#d4af37]/20 hover:border-[#d4af37]/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const displaySrc = getImage(`gallery-${item.id}`, item.image);

            return (
              <div
                key={item.id}
                onClick={() => setLightboxImage({ url: displaySrc, title: item.title, category: item.category, description: item.description })}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 cursor-pointer shadow-lg bg-[#12131b]"
              >
                <UploadableImage
                  imageKey={`gallery-${item.id}`}
                  defaultSrc={item.image}
                  alt={`${item.title} at Kanishka Veg Restaurant Tardeo Mumbai`}
                  label="Upload Photo"
                  badgePosition="top-right"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  containerClassName="relative w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                {/* View Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#d4af37]/90 text-[#0c0d12] flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Caption Info */}
                <div className="absolute bottom-4 inset-x-4 pointer-events-none z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif-luxury text-[#f7f3eb] font-medium leading-tight line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-[#181a24] text-[#ede8df] hover:text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-[#d4af37]/30 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                {lightboxImage.category}
              </span>
              <h3 className="text-lg sm:text-xl font-serif-luxury text-[#f7f3eb] font-medium mt-0.5">
                {lightboxImage.title}
              </h3>
              {lightboxImage.description && (
                <p className="text-xs sm:text-sm text-[#b8b0a1] mt-1 font-light">
                  {lightboxImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
