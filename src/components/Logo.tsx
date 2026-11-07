import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);

  // Official logo provided by user
  const logoUrl = 'https://i.ibb.co/6c0HXR85/logo.png';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10 md:h-12',
    lg: 'h-14 md:h-16',
  };

  if (!imageError) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={logoUrl}
          alt="ZI PERFUME"
          className={`${sizeClasses[size]} w-auto object-contain transition-opacity duration-300`}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  // Resilient elegant typographic fallback in case network restricts external images
  const textColor = variant === 'light' ? 'text-white' : 'text-emerald-deep';
  const subColor = variant === 'light' ? 'text-gold-light' : 'text-gold';

  return (
    <div className={`inline-flex flex-col tracking-wider select-none ${className}`}>
      <span className={`font-display text-xl md:text-2xl font-semibold tracking-widest ${textColor}`}>
        ZI PERFUME
      </span>
      <span className={`text-[9px] uppercase tracking-[0.25em] ${subColor} -mt-1 font-body`}>
        BOLE · ADDIS ABABA
      </span>
    </div>
  );
};
