import React from 'react';
import { CATEGORIES } from '../data/perfumes';
import { FragranceCategory } from '../types/perfume';
import { ArrowUpRight } from 'lucide-react';

interface CollectionsProps {
  onSelectCategory: (category: FragranceCategory) => void;
  selectedCategory: FragranceCategory;
}

export const Collections: React.FC<CollectionsProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section id="collections" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
              CURATED COLLECTIONS
            </span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
            Find Your Signature Scent
          </h2>

          <p className="mt-4 text-base text-charcoal-muted leading-relaxed font-light">
            Explore fragrances for every personality, every occasion, and every moment.
            Crafted for exceptional longevity and lingering presence.
          </p>
        </div>

        {/* Categories Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative rounded-2xl overflow-hidden bg-white border transition-all duration-300 cursor-pointer flex flex-col h-[400px] sm:h-[440px] shadow-sm hover:shadow-xl ${
                  isSelected
                    ? 'border-gold ring-2 ring-gold/40'
                    : 'border-[#E8E5DC] hover:border-gold/60'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory(cat.name);
                  }
                }}
                aria-label={`View ${cat.name}`}
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden bg-sage-50">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/90 bg-emerald-deep/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
                      ZI PERFUME
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-emerald-deep transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium mb-1.5 block">
                      {cat.tagline}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-white group-hover:text-gold-light transition-colors">
                      {cat.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 font-light leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gold-light">
                      <span>View Fragrances</span>
                      <span className="text-white/70">Explore &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
