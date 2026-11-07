import React from 'react';
import { Truck, Store, Zap, MessageCircle } from 'lucide-react';
import { WHATSAPP_INTL_NUMBER, FREE_DELIVERY_THRESHOLD } from '../utils/cart';

export const DeliverySection: React.FC = () => {
  const deliveryOptions = [
    {
      title: 'Store Pick-up (Bole)',
      fee: 'Free of Charge',
      time: 'Same-day during showroom hours',
      details: 'Pick up your order directly at FM Building, 2nd Floor, Room #214, Bole (in front of the New Stadium).',
      icon: Store,
    },
    {
      title: 'Standard Addis Ababa Delivery',
      fee: `250 ETB (Free on orders ≥ ${FREE_DELIVERY_THRESHOLD.toLocaleString()} ETB)`,
      time: '24–48 hours across Addis Ababa',
      details: 'Reliable courier delivery right to your home, office, or designated landmark anywhere in Addis Ababa.',
      icon: Truck,
    },
    {
      title: 'Express Same-Day Courier',
      fee: '450 ETB',
      time: 'Priority same-day delivery',
      details: 'For urgent gifts or same-day fragrance needs. Orders confirmed before 3:00 PM are dispatched promptly.',
      icon: Zap,
    },
  ];

  const deliveryInquiryUrl = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
    'Hello ZI PERFUME! I would like to inquire about delivery options to my location in Addis Ababa.'
  )}`;

  return (
    <section className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
              SEAMLESS CONVENIENCE
            </span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
            Your Fragrance, Delivered.
          </h2>

          <p className="mt-4 text-base text-charcoal-muted leading-relaxed font-light">
            ZI PERFUME offers delivery options across Addis Ababa. Free delivery or courier delivery may be available depending on current order criteria.
          </p>
        </div>

        {/* 3 Delivery Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {deliveryOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-[#E8E5DC] hover:border-gold/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sage-50 text-emerald-deep flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                    {opt.title}
                  </h3>

                  <p className="text-sm font-semibold text-emerald-deep mb-3">
                    {opt.fee}
                  </p>

                  <p className="text-xs text-charcoal-muted font-light leading-relaxed mb-4">
                    {opt.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E5DC] flex items-center justify-between text-[11px] text-charcoal-muted">
                  <span className="font-medium">Estimated Time:</span>
                  <span className="font-semibold text-charcoal">{opt.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Terms and Inquiry Callout */}
        <div className="rounded-2xl bg-sage-50/70 border border-[#C9DAC9] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="font-display text-lg font-semibold text-charcoal">
              Need custom delivery coordination?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
              We deliver to Bole, CMC, Kazanchis, Piassa, Old Airport, Sarbet, and all Addis Ababa districts. Send your preferred drop-off landmark on WhatsApp.
            </p>
          </div>

          <a
            href={deliveryInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-deep hover:bg-emerald-dark text-ivory text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-gold/40 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-gold-light" />
            <span>Delivery Inquiry via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
