import React, { useState, useMemo } from 'react';
import { Perfume, FragranceCategory } from '../types/perfume';
import { SAMPLE_PERFUMES } from '../data/perfumes';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: FragranceCategory;
  onSelectCategory: (category: FragranceCategory) => void;
  onViewDetails: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume, sizeMl: number, priceEtb: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  onAddToCart,
  searchQuery,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories: FragranceCategory[] = [
    'All',
    "Men's Fragrances",
    "Women's Fragrances",
    'Unisex Fragrances',
    'Luxury Collection',
    'Fresh & Everyday',
    'Gift Collection',
  ];

  const filteredPerfumes = useMemo(() => {
    return SAMPLE_PERFUMES.filter((perfume) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || perfume.category === selectedCategory;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        perfume.name.toLowerCase().includes(q) ||
        perfume.brand.toLowerCase().includes(q) ||
        perfume.fragranceFamily.toLowerCase().includes(q) ||
        perfume.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.sizes[0].priceEtb - b.sizes[0].priceEtb;
      }
      if (sortBy === 'price-desc') {
        return b.sizes[0].priceEtb - a.sizes[0].priceEtb;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
                BOLE SHOWROOM CATALOG
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
              Discover Our Fragrances
            </h2>
            <p className="mt-2 text-sm sm:text-base text-charcoal-muted max-w-xl font-light">
              Explore authentic luxury fragrances available for immediate purchase and delivery across Addis Ababa.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Inline Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search perfumes, notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-full bg-white border border-[#E8E5DC] focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-charcoal placeholder:text-charcoal-muted/60 transition-colors"
                aria-label="Filter perfumes by keyword"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted hover:text-charcoal cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-charcoal-muted hidden sm:inline-block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 text-xs rounded-full bg-white border border-[#E8E5DC] focus:outline-hidden focus:border-gold text-charcoal font-medium cursor-pointer"
                aria-label="Sort products by"
              >
                <option value="featured">Featured Fragrances</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Fragrance Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-deep text-ivory shadow-xs border border-gold/40'
                    : 'bg-white text-charcoal-muted hover:text-charcoal border border-[#E8E5DC] hover:border-[#C9DAC9]'
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-charcoal-muted mb-6 px-1">
          <span>
            Showing <strong className="text-charcoal font-semibold tabular-nums">{filteredPerfumes.length}</strong> {filteredPerfumes.length === 1 ? 'fragrance' : 'fragrances'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="inline-flex items-center gap-1 text-emerald-deep hover:text-gold-dark font-medium cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPerfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#C9DAC9] bg-white p-12 text-center max-w-lg mx-auto">
            <h3 className="font-display text-2xl font-semibold text-charcoal">
              No fragrances found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-charcoal-muted">
              We couldn't find matches for &ldquo;{searchQuery}&rdquo;. Try another fragrance note, category, or clear your search.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-emerald-dark transition-colors cursor-pointer"
            >
              View All Fragrances
            </button>
          </div>
        )}

        {/* Business Note for Demonstration Data */}
        <div className="mt-12 p-4 rounded-xl bg-sage-50 border border-[#C9DAC9] text-center max-w-2xl mx-auto">
          <p className="text-xs text-charcoal-muted leading-relaxed">
            <strong className="text-emerald-deep font-semibold">Store Management Notice:</strong> These sample demonstration fragrances are configured in an easily editable data file (<code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#C9DAC9]">src/data/perfumes.ts</code>). Bottle sizes, prices (ETB), descriptions, and categories can be updated at any time without backend complexity.
          </p>
        </div>
      </div>
    </section>
  );
};
