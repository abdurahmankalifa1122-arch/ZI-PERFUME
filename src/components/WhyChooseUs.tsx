import React from 'react';
import { Sparkles, MessageSquareHeart, Truck, Headset } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      index: '01',
      title: 'Carefully Selected Fragrances',
      description: 'Explore a collection selected for different tastes and preferences, curated with an eye for exceptional depth and lasting scent profiles.',
      icon: Sparkles,
    },
    {
      index: '02',
      title: 'Easy Ordering',
      description: 'Discover your fragrance and place your order conveniently directly through our streamlined WhatsApp checkout or personalized phone call.',
      icon: MessageSquareHeart,
    },
    {
      index: '03',
      title: 'Addis Ababa Delivery',
      description: 'Delivery options across Addis Ababa, including free delivery when current order criteria (orders 5,000 ETB and above) are met.',
      icon: Truck,
    },
    {
      index: '04',
      title: 'Personal Assistance',
      description: 'Contact our team for product information, availability, and price lists. Our Bole boutique specialists are always ready to guide you.',
      icon: Headset,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
              THE ZI PERFUME DISTINCTION
            </span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight text-balance">
            More Than a Fragrance. An Experience.
          </h2>

          <p className="mt-4 text-base text-charcoal-muted leading-relaxed font-light">
            Rooted in Bole, Addis Ababa, we combine the refinement of international haute perfumery with dedicated local hospitality.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.index}
                className="group p-8 rounded-2xl bg-white border border-[#E8E5DC] hover:border-gold/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-bold text-gold-dark/80 group-hover:text-emerald-deep transition-colors tabular-nums">
                      {b.index}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sage-50 text-emerald-deep group-hover:bg-emerald-deep group-hover:text-gold-light flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-emerald-deep transition-colors mb-3 leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center text-[11px] font-semibold tracking-wider uppercase text-gold-dark group-hover:text-emerald-deep transition-colors">
                  <span>ZI Excellence</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
