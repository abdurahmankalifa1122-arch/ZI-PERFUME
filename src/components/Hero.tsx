import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onDiscover: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onDiscover }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5] to-sage-50/40 py-12 lg:py-20 border-b border-[#E8E5DC]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-6">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-emerald-deep font-body">
                THE ART OF FINE FRAGRANCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal font-semibold tracking-tight leading-[1.12] text-balance">
              Your Scent. <br />
              <span className="italic font-normal text-emerald-deep">Your Signature.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-xl font-light">
              Discover fragrances that express your personality, elevate your presence,
              and leave a lasting impression. Curated with distinction for Addis Ababa’s fragrance lovers.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExplore}
                className="px-8 py-3.5 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-[0.18em] uppercase hover:bg-emerald-dark transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 group cursor-pointer border border-gold/40"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 text-gold-light group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDiscover}
                className="px-8 py-3.5 rounded-full bg-transparent text-charcoal text-xs font-semibold tracking-[0.18em] uppercase hover:bg-sage-100/70 border border-[#C9DAC9] transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                DISCOVER ZI PERFUME
              </button>
            </div>

            {/* Quality & Location Badges */}
            <div className="pt-6 border-t border-[#E8E5DC] grid grid-cols-2 gap-4 text-xs text-charcoal-muted">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-deep shrink-0" />
                <span>Bole, FM Building 2nd Fl.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>Authentic Luxury Formulations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Campaign Image */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative luxury frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#E8E5DC]">
                <img
                  src="/src/assets/images/hero_luxury_perfume_1794041257491.jpg"
                  alt="ZI PERFUME Luxury Campaign featuring Aura Sage with fresh botanical elements"
                  className="w-full h-[440px] sm:h-[520px] lg:h-[560px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom luxury caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold-light font-medium block">
                      FEATURED COMPOSITION
                    </span>
                    <p className="font-display text-xl sm:text-2xl font-medium tracking-wide">
                      Aura Sage Parfum
                    </p>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/30 tabular-nums">
                    Bole Boutique
                  </span>
                </div>
              </div>

              {/* Floating gold accent tag */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#FAF9F5] border border-gold/40 shadow-xl rounded-xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-emerald-deep flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-gold-light" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-deep tracking-wide uppercase">
                    Signature Experience
                  </p>
                  <p className="text-[11px] text-charcoal-muted">
                    Fast Addis Ababa Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
