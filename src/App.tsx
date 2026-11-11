import React, { useState, useEffect } from 'react';
import { Perfume, FragranceCategory, CartItem } from './types/perfume';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CampaignBanner } from './components/CampaignBanner';
import { AboutSection } from './components/AboutSection';
import { DeliverySection } from './components/DeliverySection';
import { StoreLocationContact } from './components/StoreLocationContact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { SearchModal } from './components/SearchModal';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_INTL_NUMBER } from './utils/cart';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zi_perfume_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) => item && item.cartItemId && item.perfume && typeof item.priceEtb === 'number'
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zi_perfume_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FragranceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalPerfume, setModalPerfume] = useState<Perfume | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [orderToast, setOrderToast] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (
    perfume: Perfume,
    sizeMl: number,
    priceEtb: number,
    quantity = 1
  ) => {
    const cartItemId = `${perfume.id}-${sizeMl}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          perfume,
          selectedSizeMl: sizeMl,
          priceEtb,
          quantity,
        },
      ];
    });

    setOrderToast(`Added ${perfume.name} (${sizeMl}ml) to your shopping bag.`);
    setTimeout(() => setOrderToast(null), 3000);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Navigation smoothly scrolls to anchor
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromCollections = (category: FragranceCategory) => {
    setSelectedCategory(category);
    handleNavigate('shop');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const floatingWhatsappUrl = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
    'Hello ZI PERFUME! I am exploring your fragrance website and would like some guidance on scents.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-charcoal flex flex-col font-body selection:bg-sage-200 selection:text-emerald-deep">
      {/* Toast Notification */}
      {orderToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-emerald-deep text-ivory text-xs px-4 py-3 rounded-2xl shadow-xl border border-gold/40 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
          <span className="font-medium">{orderToast}</span>
        </div>
      )}

      {/* Top Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <div id="home">
          <Hero
            onExplore={() => handleNavigate('shop')}
            onDiscover={() => handleNavigate('about')}
          />
        </div>

        {/* 2. Collections Category Cards */}
        <Collections
          onSelectCategory={handleSelectCategoryFromCollections}
          selectedCategory={selectedCategory}
        />

        {/* 3. Featured Products Grid */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onViewDetails={(perfume) => setModalPerfume(perfume)}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 4. Why Choose ZI PERFUME (4 Benefits) */}
        <WhyChooseUs />

        {/* 5. Signature Brand Campaign */}
        <CampaignBanner onExplore={() => handleNavigate('shop')} />

        {/* 6. About ZI PERFUME */}
        <AboutSection onContactClick={() => handleNavigate('contact')} />

        {/* 7. Delivery Information */}
        <DeliverySection />

        {/* 8. Store Location and Contact Form */}
        <StoreLocationContact />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}

      {/* Product Detail Modal */}
      <ProductModal
        perfume={modalPerfume}
        onClose={() => setModalPerfume(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => handleNavigate('shop')}
      />

      {/* WhatsApp Checkout Review Dialog */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          setIsCheckoutOpen(false);
          setCartItems([]);
          setOrderToast('Order transmitted to WhatsApp! Our team will contact you shortly.');
          setTimeout(() => setOrderToast(null), 5000);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPerfume={(perfume) => {
          setModalPerfume(perfume);
          setIsSearchOpen(false);
        }}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={floatingWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
          aria-label="Chat with ZI PERFUME on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="sr-only">Chat with ZI PERFUME on WhatsApp</span>

          {/* Hover Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-emerald-deep text-white text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gold/40">
            Order on WhatsApp (0909236008)
          </span>
        </a>
      </aside>
    </div>
  );
}
