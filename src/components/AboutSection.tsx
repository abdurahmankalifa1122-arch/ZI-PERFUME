import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_PHONE_LOCAL, WHATSAPP_INTL_NUMBER } from '../utils/cart';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Store Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#E8E5DC]">
              <img
                src="/src/assets/images/boutique_luxury_interior_1794041260120.jpg"
                alt="ZI PERFUME Boutique Showroom in Bole, Addis Ababa"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />

              {/* Inset badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#E8E5DC] flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-deep">
                    SHOWROOM LOCATION
                  </p>
                  <p className="text-xs font-medium text-charcoal">
                    Bole, FM Building, 2nd Fl. Room #214
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider">
                  Addis Ababa
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
                  OUR STORY
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
                Welcome to ZI PERFUME
              </h2>
            </div>

            <p className="text-base text-charcoal-muted leading-relaxed font-light">
              ZI PERFUME is a fragrance destination in Bole, Addis Ababa, bringing customers
              a convenient way to discover and shop for perfumes. Explore our collection,
              request product information, and connect with our team for assistance with
              your fragrance selection.
            </p>

            <div className="space-y-3 pt-2 text-sm text-charcoal">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-deep shrink-0 mt-0.5" />
                <span>
                  Bole, in front of the New Stadium, FM Building, 2nd Floor, Room #214, Addis Ababa, Ethiopia.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>Phone: {BUSINESS_PHONE_LOCAL}</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-deep shrink-0" />
                <span>WhatsApp: {BUSINESS_PHONE_LOCAL} (Direct fragrance assistance)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="px-8 py-3.5 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-dark transition-all duration-300 shadow-md flex items-center gap-2.5 cursor-pointer border border-gold/40"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                  'Hello ZI PERFUME! I would like to learn more about your fragrance boutique in Bole.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white text-emerald-deep text-xs font-semibold tracking-[0.18em] uppercase hover:bg-sage-50 border border-[#C9DAC9] hover:border-gold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-deep" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
