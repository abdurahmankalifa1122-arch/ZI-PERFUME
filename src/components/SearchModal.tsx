import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_PERFUMES } from '../data/perfumes';
import { Perfume } from '../types/perfume';
import { formatEtb } from '../utils/cart';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPerfume,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = SAMPLE_PERFUMES.filter((p) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.fragranceFamily.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto bg-charcoal/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-3xl shadow-2xl border border-[#E8E5DC] overflow-hidden z-10 mt-6 md:mt-12">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8E5DC] flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-deep shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            placeholder="Search fragrances, notes (e.g. Sage, Amber, Rose, Floral)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent text-charcoal placeholder:text-charcoal-muted/60 focus:outline-hidden font-light"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-charcoal-muted hover:text-charcoal cursor-pointer"
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted hover:text-emerald-deep rounded-full hover:bg-sage-50 transition-colors cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-2.5 bg-sage-50/50 border-b border-[#E8E5DC] flex items-center gap-2 overflow-x-auto text-xs text-charcoal-muted">
          <span className="shrink-0 font-medium text-emerald-deep flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" /> Popular:
          </span>
          {['Sage', 'Amber', 'Men', 'Women', 'Gift', 'Luxury'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#E8E5DC] hover:border-gold text-[11px] text-charcoal cursor-pointer transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-display text-lg text-charcoal font-semibold">
                No matching fragrances
              </p>
              <p className="text-xs text-charcoal-muted mt-1">
                Try searching for general notes like &ldquo;fresh&rdquo;, &ldquo;parfum&rdquo;, or &ldquo;floral&rdquo;.
              </p>
            </div>
          ) : (
            results.map((perfume) => (
              <div
                key={perfume.id}
                onClick={() => {
                  onSelectPerfume(perfume);
                  onClose();
                }}
                className="group p-3 rounded-2xl bg-white hover:bg-sage-50/60 border border-[#E8E5DC] hover:border-gold/60 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-14 h-14 object-cover rounded-xl bg-sage-50 shrink-0 border border-[#E8E5DC]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium block truncate">
                      {perfume.category} · {perfume.brand}
                    </span>
                    <h4 className="font-display text-base font-semibold text-charcoal group-hover:text-emerald-deep transition-colors truncate">
                      {perfume.name}
                    </h4>
                    <p className="text-xs text-charcoal-muted truncate font-light">
                      {perfume.fragranceFamily}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-display text-sm font-semibold text-emerald-deep tabular-nums">
                    {formatEtb(perfume.sizes[0].priceEtb)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sage-100 group-hover:bg-emerald-deep group-hover:text-gold-light text-emerald-deep flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
