import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MessageCircle, Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { WHATSAPP_INTL_NUMBER, BUSINESS_PHONE_LOCAL } from '../utils/cart';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Collections', id: 'collections' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
    'Hello ZI PERFUME! I am visiting your website and would like to ask about fragrance availability.'
  )}`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8E5DC]'
          : 'bg-[#FAF9F5] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left focus:outline-hidden group flex items-center"
              aria-label="ZI PERFUME Home"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm tracking-wider uppercase font-medium transition-colors duration-200 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-emerald-deep font-semibold'
                      : 'text-charcoal-muted hover:text-emerald-deep'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Right Actions (Search, Cart, WhatsApp) */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-charcoal-muted hover:text-emerald-deep hover:bg-sage-100/50 rounded-full transition-colors cursor-pointer"
              aria-label="Search fragrances"
              title="Search fragrances"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="p-2.5 text-charcoal-muted hover:text-emerald-deep hover:bg-sage-100/50 rounded-full transition-colors relative cursor-pointer"
              aria-label={`Shopping bag with ${cartCount} items`}
              title="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-emerald-deep text-gold-light text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF9F5] tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Order Button (Desktop) */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-emerald-dark transition-all duration-200 shadow-xs border border-gold/40 hover:border-gold hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-gold-light" />
              <span>WhatsApp Order</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-charcoal-muted hover:text-emerald-deep rounded-full cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#E8E5DC] px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-base tracking-wider uppercase font-medium py-2 px-3 rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'bg-sage-100 text-emerald-deep font-semibold'
                    : 'text-charcoal hover:bg-sage-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E5DC] flex flex-col gap-2.5">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-deep text-ivory text-sm font-semibold tracking-wider uppercase shadow-xs border border-gold/50"
            >
              <MessageCircle className="w-4 h-4 text-gold-light" />
              <span>WhatsApp: 0909236008</span>
            </a>

            <a
              href={`tel:${BUSINESS_PHONE_LOCAL}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white text-emerald-deep text-xs font-semibold tracking-wider uppercase border border-[#E8E5DC]"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Us: {BUSINESS_PHONE_LOCAL}</span>
            </a>

            <p className="text-[11px] text-center text-charcoal-muted pt-1">
              Bole, in front of the New Stadium, FM Building, 2nd Floor, Room #214
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
