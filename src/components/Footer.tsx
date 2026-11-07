import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_PHONE_LOCAL, BUSINESS_PHONE_INTL, WHATSAPP_INTL_NUMBER } from '../utils/cart';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Collections', id: 'collections' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-emerald-deep text-white border-t border-gold/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/10 p-3 rounded-2xl inline-block backdrop-blur-xs border border-white/15">
              <Logo variant="light" size="md" />
            </div>

            <p className="text-sm text-white/80 leading-relaxed font-light max-w-sm">
              ZI PERFUME is a world-class luxury fragrance boutique located in Bole, Addis Ababa.
              Experience curated international and niche perfumes formulated for memorable presence and longevity.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-gold-light">
              <ShieldCheck className="w-4 h-4 text-gold-light" />
              <span>100% Authentic Luxury Guarantee</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light font-body">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-gold-light transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light font-body">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                    'Hello ZI PERFUME support!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-gold-light" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_PHONE_LOCAL}`}
                  className="hover:text-gold-light transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-light" />
                  <span>Call {BUSINESS_PHONE_LOCAL}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-gold-light transition-colors text-left"
                >
                  Delivery Information
                </button>
              </li>
            </ul>
          </div>

          {/* Physical Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light font-body">
              Showroom Location
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Bole, in front of the New Stadium, <br />
                  FM Building, 2nd Floor, Room #214, <br />
                  Addis Ababa, Ethiopia.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-light shrink-0" />
                <span className="font-semibold text-white">Phone: {BUSINESS_PHONE_LOCAL}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-light shrink-0" />
                <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Clean Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 ZI PERFUME. All Rights Reserved.</p>
          <p className="text-[11px] text-gold-light/90 tracking-wide">
            Haute Parfumerie · Bole, Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};
