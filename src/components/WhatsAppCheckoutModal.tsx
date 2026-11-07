import React, { useState } from 'react';
import { CartItem, CheckoutDetails, DeliveryMethod } from '../types/perfume';
import {
  formatEtb,
  calculateTotal,
  buildWhatsAppOrderMessage,
  createWhatsAppOrderUrl,
  DELIVERY_FEES,
  BUSINESS_PHONE_LOCAL,
} from '../utils/cart';
import { X, MessageCircle, CheckCircle, ShieldCheck, MapPin } from 'lucide-react';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{ customerName?: string; phone?: string; deliveryLocation?: string }>({});

  if (!isOpen) return null;

  const currentCheckout: CheckoutDetails = {
    customerName,
    phone,
    deliveryLocation,
    deliveryMethod,
    notes,
  };

  const { subtotal, deliveryFee, total, isFreeDelivery } = calculateTotal(items, deliveryMethod);

  const validate = () => {
    const errs: { customerName?: string; phone?: string; deliveryLocation?: string } = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your name.';
    }
    if (!phone.trim()) {
      errs.phone = 'Please enter your phone number (e.g. 0909236008).';
    } else if (phone.trim().length < 9) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!deliveryLocation.trim() && deliveryMethod !== 'pickup') {
      errs.deliveryLocation = 'Please specify your delivery address or landmark in Addis Ababa.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generatedMessage = buildWhatsAppOrderMessage(items, currentCheckout);

  const handleSendOrder = () => {
    if (!validate()) {
      setShowPreview(false);
      return;
    }
    const url = createWhatsAppOrderUrl(items, currentCheckout);
    window.open(url, '_blank', 'noopener,noreferrer');
    onOrderCompleted();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-charcoal/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-3xl shadow-2xl border border-[#E8E5DC] overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-emerald-deep text-white flex items-center justify-between border-b border-gold/30">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold-light font-bold">
              CONVENIENT WHATSAPP ORDERING
            </span>
            <h3 id="checkout-modal-title" className="font-display text-xl font-semibold">
              Finalize Your Fragrance Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Summary Strip */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E5DC] space-y-2">
            <div className="flex justify-between items-center text-xs text-charcoal-muted font-medium">
              <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)} bottles):</span>
              <span className="tabular-nums font-semibold text-charcoal">{formatEtb(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-charcoal-muted">
              <span>Delivery:</span>
              <span className="font-semibold text-emerald-deep tabular-nums">
                {deliveryMethod === 'pickup'
                  ? 'Free (Store Pick-up)'
                  : isFreeDelivery
                  ? 'FREE (Promo Applied)'
                  : formatEtb(deliveryFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#E8E5DC] flex justify-between items-center text-sm font-semibold text-charcoal">
              <span>Total Payable upon Delivery / Pick-up:</span>
              <span className="font-display text-xl text-emerald-deep tabular-nums">
                {formatEtb(total)}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Almaz Bekele"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-white focus:outline-hidden transition-colors ${
                  errors.customerName ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                }`}
              />
              {errors.customerName && (
                <p className="text-[11px] text-red-500 mt-1">{errors.customerName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                Phone Number (Addis Ababa) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 0909236008"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-white focus:outline-hidden transition-colors ${
                  errors.phone ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Delivery Method Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                Preferred Delivery Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(Object.keys(DELIVERY_FEES) as DeliveryMethod[]).map((m) => {
                  const info = DELIVERY_FEES[m];
                  const isSelected = deliveryMethod === m;
                  const feeDisplay =
                    m === 'pickup'
                      ? 'Free'
                      : m === 'standard' && isFreeDelivery
                      ? 'FREE'
                      : formatEtb(info.fee);

                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setDeliveryMethod(m)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-deep bg-emerald-deep/5 ring-1 ring-emerald-deep'
                          : 'border-[#E8E5DC] bg-white hover:border-gold'
                      }`}
                    >
                      <span className="font-semibold text-xs text-charcoal block line-clamp-1">
                        {info.label.split('(')[0]}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-deep block mt-1 tabular-nums">
                        {feeDisplay}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Location */}
            {deliveryMethod !== 'pickup' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                  Delivery Address / Landmark <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bole Medhanealem near Edna Mall, Addis Ababa"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-white focus:outline-hidden transition-colors ${
                    errors.deliveryLocation ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                  }`}
                />
                {errors.deliveryLocation && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.deliveryLocation}</p>
                )}
              </div>
            )}

            {deliveryMethod === 'pickup' && (
              <div className="p-3 rounded-xl bg-sage-50 border border-[#C9DAC9] text-xs text-charcoal-muted flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-deep shrink-0 mt-0.5" />
                <span>
                  <strong>Pick-up at Bole Showroom:</strong> FM Building, 2nd Floor, Room #214 (in front of the New Stadium). Ready for collection upon order notification.
                </span>
              </div>
            )}

            {/* Optional Special Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                Order Notes / Gift Requests <span className="text-[10px] lowercase text-charcoal-muted/70">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Add special instructions, e.g. gift wrap request or preferred delivery time..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E5DC] text-xs text-charcoal bg-white focus:outline-hidden focus:border-gold resize-none"
              />
            </div>
          </div>

          {/* WhatsApp Message Preview Toggle */}
          <div className="border border-[#E8E5DC] rounded-2xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-emerald-deep hover:bg-sage-50/50 cursor-pointer transition-colors"
            >
              <span>{showPreview ? 'Hide WhatsApp Message Preview' : 'Review Prepared WhatsApp Message'}</span>
              <span className="text-gold-dark font-medium">{showPreview ? '▲' : '▼'}</span>
            </button>

            {showPreview && (
              <div className="p-4 bg-[#E5DDD5]/40 border-t border-[#E8E5DC]">
                <p className="text-[11px] text-charcoal-muted mb-2 font-medium">
                  This message will automatically open in WhatsApp for our Bole store concierge to process:
                </p>
                <pre className="p-3 rounded-xl bg-white text-charcoal text-[11px] leading-relaxed whitespace-pre-wrap font-mono border border-[#C9DAC9] shadow-inner select-all">
                  {generatedMessage}
                </pre>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            <button
              onClick={handleSendOrder}
              className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Send Order to WhatsApp (0909236008)</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-muted">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-deep" />
                Pay on Delivery / Pick-up
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                Official Bole Boutique
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
