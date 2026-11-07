import React, { useState } from 'react';
import { Perfume } from '../types/perfume';
import { formatEtb, createPerfumeInquiryUrl } from '../utils/cart';
import { X, ShoppingBag, MessageCircle, Check, Shield, Truck } from 'lucide-react';

interface ProductModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, sizeMl: number, priceEtb: number, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
}) => {
  if (!perfume) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedSize = perfume.sizes[selectedSizeIndex] || perfume.sizes[0];
  const totalPrice = selectedSize.priceEtb * quantity;

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize.sizeMl, selectedSize.priceEtb, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  const whatsappUrl = createPerfumeInquiryUrl(perfume.name, selectedSize.sizeMl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-charcoal/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-3xl shadow-2xl border border-[#E8E5DC] overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-charcoal hover:text-emerald-deep shadow-sm transition-colors cursor-pointer"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image with gallery styling */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-sage-50/50 overflow-hidden flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E8E5DC]">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full max-h-[460px] object-cover rounded-2xl shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-deep text-gold-light px-3 py-1 rounded-full shadow-sm">
                {perfume.category}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-charcoal px-3 py-1 rounded-full border border-[#E8E5DC]">
                Authentic Fragrance
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and Category */}
              <div className="flex items-center justify-between text-xs text-gold-dark font-medium uppercase tracking-[0.2em] mb-2 font-body">
                <span>{perfume.brand}</span>
                <span className="text-charcoal-muted">Bole, Addis Ababa</span>
              </div>

              {/* Title */}
              <h2
                id="product-modal-title"
                className="font-display text-2xl sm:text-3xl text-charcoal font-semibold tracking-tight leading-snug"
              >
                {perfume.name}
              </h2>

              {/* Fragrance Family */}
              <div className="mt-2 text-xs sm:text-sm text-emerald-deep font-medium">
                Fragrance Family: <span className="font-normal text-charcoal-muted">{perfume.fragranceFamily}</span>
              </div>

              {/* Price display */}
              <div className="mt-4 pb-4 border-b border-[#E8E5DC] flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-emerald-deep tabular-nums">
                  {formatEtb(selectedSize.priceEtb)}
                </span>
                <span className="text-xs text-charcoal-muted">
                  for {selectedSize.sizeMl}ml bottle
                </span>
              </div>

              {/* Fragrance Description */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                  About The Fragrance
                </h4>
                <p className="text-sm text-charcoal leading-relaxed font-light">
                  {perfume.description}
                </p>
              </div>

              {/* Available Bottle Sizes */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted block mb-2">
                  Select Bottle Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {perfume.sizes.map((sizeOpt, idx) => (
                    <button
                      key={sizeOpt.sizeMl}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedSizeIndex === idx
                          ? 'border-emerald-deep bg-emerald-deep/5 ring-1 ring-emerald-deep'
                          : 'border-[#E8E5DC] bg-white hover:border-gold'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-charcoal">
                          {sizeOpt.sizeMl}ml
                        </span>
                        <span className="text-xs font-medium text-emerald-deep tabular-nums">
                          {formatEtb(sizeOpt.priceEtb)}
                        </span>
                      </div>
                      <span className="text-[11px] text-charcoal-muted block mt-0.5">
                        Eau de Parfum Flacon
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                  Quantity
                </span>
                <div className="flex items-center border border-[#E8E5DC] bg-white rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-sage-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-charcoal tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-sage-50 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart and WhatsApp Order */}
            <div className="pt-4 border-t border-[#E8E5DC] space-y-3">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  addedAnimation
                    ? 'bg-sage-dark text-white'
                    : 'bg-emerald-deep text-ivory hover:bg-emerald-dark border border-gold/40'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-gold-light" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold-light" />
                    <span>Add to Bag • {formatEtb(totalPrice)}</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-sage-50 text-emerald-deep text-xs font-semibold tracking-wider uppercase border border-[#C9DAC9] hover:border-gold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-deep" />
                <span>Order Through WhatsApp (0909236008)</span>
              </a>

              {/* Trust Badges */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-deep" />
                  Addis Ababa Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-gold" />
                  100% Genuine Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
