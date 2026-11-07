import React, { useState } from 'react';
import { Perfume } from '../types/perfume';
import { formatEtb, createPerfumeInquiryUrl } from '../utils/cart';
import { ShoppingBag, Eye, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  perfume: Perfume;
  onViewDetails: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume, sizeMl: number, priceEtb: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onViewDetails,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const currentSizeOption = perfume.sizes[selectedSizeIndex] || perfume.sizes[0];

  const handleAdd = () => {
    onAddToCart(perfume, currentSizeOption.sizeMl, currentSizeOption.priceEtb);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const whatsappInquiryUrl = createPerfumeInquiryUrl(
    perfume.name,
    currentSizeOption.sizeMl
  );

  return (
    <div className="group rounded-2xl bg-white border border-[#E8E5DC] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Top Image Section */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-sage-50/60">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#FAF9F5]/90 backdrop-blur-xs text-emerald-deep px-2.5 py-1 rounded-full border border-[#E8E5DC]">
            {perfume.category}
          </span>
          {perfume.tag && (
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-deep/90 backdrop-blur-xs text-gold-light px-2.5 py-1 rounded-full border border-gold/30">
              {perfume.tag}
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <button
          onClick={() => onViewDetails(perfume)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-emerald-deep shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
          aria-label={`View details for ${perfume.name}`}
          title="View product details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-gold-dark font-body">
            {perfume.brand}
          </p>

          {/* Fragrance Name */}
          <h3
            onClick={() => onViewDetails(perfume)}
            className="font-display text-xl font-semibold text-charcoal hover:text-emerald-deep transition-colors cursor-pointer mt-1 leading-snug line-clamp-1"
            title={perfume.name}
          >
            {perfume.name}
          </h3>

          {/* Fragrance Family */}
          <p className="text-xs text-charcoal-muted mt-1 font-light line-clamp-1">
            {perfume.fragranceFamily}
          </p>

          {/* Available Sizes Selector */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[11px] text-charcoal-muted font-medium">Size:</span>
            <div className="flex gap-1.5">
              {perfume.sizes.map((s, idx) => (
                <button
                  key={s.sizeMl}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`px-2 py-0.5 text-xs rounded-md font-medium border transition-colors cursor-pointer ${
                    selectedSizeIndex === idx
                      ? 'border-emerald-deep bg-emerald-deep text-white'
                      : 'border-[#E8E5DC] text-charcoal-muted hover:border-gold/60'
                  }`}
                  aria-label={`${s.sizeMl}ml bottle`}
                >
                  {s.sizeMl}ml
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-4 border-t border-[#E8E5DC]">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-charcoal-muted">Price ({currentSizeOption.sizeMl}ml)</span>
            <span className="font-display text-lg font-semibold text-emerald-deep tabular-nums">
              {formatEtb(currentSizeOption.priceEtb)}
            </span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              className={`py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                justAdded
                  ? 'bg-sage-dark text-white'
                  : 'bg-emerald-deep text-ivory hover:bg-emerald-dark border border-gold/40'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gold-light" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-gold-light" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* View Details */}
            <button
              onClick={() => onViewDetails(perfume)}
              className="py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase bg-sage-50 text-emerald-deep hover:bg-sage-100 border border-[#C9DAC9] transition-colors flex items-center justify-center cursor-pointer"
            >
              Details
            </button>
          </div>

          {/* WhatsApp Order Button */}
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full py-2 rounded-lg bg-white hover:bg-sage-50 text-[#183C32] text-[11px] font-semibold tracking-wider uppercase border border-[#C9DAC9] hover:border-gold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="Order or ask questions on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-deep" />
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
