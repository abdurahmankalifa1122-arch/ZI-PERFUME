import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CampaignBannerProps {
  onExplore: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-emerald-dark text-white py-20 lg:py-32">
      {/* Background Campaign Image with Cinematic Scrim */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/campaign_editorial_perfume_1794041258537.jpg"
          alt="ZI PERFUME Cinematic Fragrance Editorial"
          className="w-full h-full object-cover object-center opacity-65 scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark via-emerald-dark/85 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent to-emerald-dark/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold-light" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-gold-light font-body">
              HAUTE PARFUMERIE CAMPAIGN
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
            Make Every Moment <br />
            <span className="italic font-normal text-gold-light">Memorable.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed font-light max-w-xl">
            Discover the beauty of fragrance and find the scent that feels uniquely yours.
            Infused with precious botanicals and masterfully aged accords that linger effortlessly from dawn until dusk.
          </p>

          {/* Action Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-emerald-dark text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl flex items-center gap-3 group cursor-pointer"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 text-emerald-dark group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-xs uppercase tracking-[0.2em] text-white/70 py-2">
              Bole · Addis Ababa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
