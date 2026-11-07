import React from 'react';
import { CartItem } from '../types/perfume';
import { formatEtb, calculateSubtotal, FREE_DELIVERY_THRESHOLD } from '../utils/cart';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl border-l border-[#E8E5DC] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E8E5DC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-emerald-deep">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 id="cart-drawer-title" className="font-display text-xl font-semibold text-charcoal">
                  Your Shopping Bag
                </h3>
                <span className="text-xs text-charcoal-muted tabular-nums">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-charcoal-muted hover:text-charcoal rounded-full hover:bg-sage-50 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="px-6 py-3 bg-sage-50 border-b border-[#C9DAC9]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-emerald-deep">
                <Truck className="w-3.5 h-3.5" />
                {amountNeededForFreeDelivery === 0 ? (
                  <strong className="text-emerald-deep font-semibold">
                    Free Addis Ababa Delivery Unlocked!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="tabular-nums font-semibold">{formatEtb(amountNeededForFreeDelivery)}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-charcoal-muted tabular-nums font-medium">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full bg-[#E8E5DC] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-deep h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-50 text-charcoal-muted/60 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg font-semibold text-charcoal">
                  Your bag is empty
                </h4>
                <p className="text-xs text-charcoal-muted max-w-xs mx-auto leading-relaxed font-light">
                  Explore our luxury fragrance catalog and discover your signature scent for Addis Ababa.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-emerald-dark transition-colors cursor-pointer border border-gold/40"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl bg-white border border-[#E8E5DC] shadow-xs flex gap-4 items-center"
                >
                  {/* Fragrance thumbnail */}
                  <img
                    src={item.perfume.image}
                    alt={item.perfume.name}
                    className="w-18 h-18 object-cover rounded-xl bg-sage-50 border border-[#E8E5DC] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-gold-dark font-medium truncate">
                      {item.perfume.brand}
                    </p>
                    <h4 className="font-display text-sm font-semibold text-charcoal truncate">
                      {item.perfume.name}
                    </h4>
                    <span className="text-[11px] text-charcoal-muted block">
                      Size: {item.selectedSizeMl}ml
                    </span>
                    <span className="text-xs font-semibold text-emerald-deep tabular-nums block mt-1">
                      {formatEtb(item.priceEtb)}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end justify-between space-y-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="p-1 text-charcoal-muted hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove from bag"
                      aria-label={`Remove ${item.perfume.name} from bag`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#E8E5DC] rounded-lg bg-[#FAF9F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 hover:bg-sage-100 text-charcoal rounded-l-lg cursor-pointer transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 hover:bg-sage-100 text-charcoal rounded-r-lg cursor-pointer transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations & WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E5DC] space-y-4">
              <div className="space-y-1.5 text-xs text-charcoal-muted">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span className="font-display text-base font-semibold text-charcoal tabular-nums">
                    {formatEtb(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>Delivery in Addis Ababa:</span>
                  <span className="text-emerald-deep font-medium">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-deep hover:bg-emerald-dark text-ivory text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-gold/40"
                >
                  <MessageCircle className="w-4 h-4 text-gold-light" />
                  <span>Checkout Through WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-charcoal-muted hover:text-emerald-deep font-medium transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-[10px] text-center text-charcoal-muted/80">
                Safe & direct payment upon delivery or store pickup in Bole.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
