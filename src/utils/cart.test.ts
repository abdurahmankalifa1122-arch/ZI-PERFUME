import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatEtb,
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTotal,
  buildWhatsAppOrderMessage,
  createWhatsAppOrderUrl,
  WHATSAPP_INTL_NUMBER,
  FREE_DELIVERY_THRESHOLD,
} from './cart';
import { CartItem, CheckoutDetails, Perfume } from '../types/perfume';

const samplePerfume: Perfume = {
  id: 'perfume-1',
  name: 'Aura Sage Parfum',
  brand: 'ZI Signature',
  category: "Fresh & Everyday",
  categorySlug: 'fresh-everyday',
  fragranceFamily: 'Aromatic Botanical & Crisp Sage',
  description: 'An invigorating signature perfume featuring fresh sage, bergamot, and earthy vetiver.',
  sizes: [
    { sizeMl: 50, priceEtb: 3800 },
    { sizeMl: 100, priceEtb: 5400 },
  ],
  image: '/src/assets/images/hero_luxury_perfume_1794041257491.jpg',
  inStock: true,
};

test('formatEtb formats numbers with ETB suffix and thousand separators', () => {
  assert.equal(formatEtb(3800), '3,800 ETB');
  assert.equal(formatEtb(12500), '12,500 ETB');
  assert.equal(formatEtb(0), '0 ETB');
});

test('calculateSubtotal sums up item prices multiplied by quantities', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'perfume-1-50',
      perfume: samplePerfume,
      selectedSizeMl: 50,
      priceEtb: 3800,
      quantity: 2,
    },
    {
      cartItemId: 'perfume-1-100',
      perfume: samplePerfume,
      selectedSizeMl: 100,
      priceEtb: 5400,
      quantity: 1,
    },
  ];
  const subtotal = calculateSubtotal(items);
  assert.equal(subtotal, 3800 * 2 + 5400); // 13,000 ETB
});

test('calculateDeliveryFee applies free delivery for pickup', () => {
  assert.equal(calculateDeliveryFee('pickup', 2000), 0);
  assert.equal(calculateDeliveryFee('pickup', 10000), 0);
});

test('calculateDeliveryFee waives standard fee when subtotal is at or above threshold', () => {
  assert.equal(calculateDeliveryFee('standard', 3000), 250);
  assert.equal(calculateDeliveryFee('standard', FREE_DELIVERY_THRESHOLD), 0);
  assert.equal(calculateDeliveryFee('standard', 7500), 0);
});

test('calculateTotal correctly breaks down totals and flags free delivery promo', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'p1-100',
      perfume: samplePerfume,
      selectedSizeMl: 100,
      priceEtb: 5400,
      quantity: 1,
    },
  ];
  const result = calculateTotal(items, 'standard');
  assert.equal(result.subtotal, 5400);
  assert.equal(result.deliveryFee, 0);
  assert.equal(result.isFreeDelivery, true);
  assert.equal(result.total, 5400);
});

test('buildWhatsAppOrderMessage includes all customer and product details', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'p1-50',
      perfume: samplePerfume,
      selectedSizeMl: 50,
      priceEtb: 3800,
      quantity: 1,
    },
  ];
  const checkout: CheckoutDetails = {
    customerName: 'Abebe Kebede',
    phone: '0911223344',
    deliveryLocation: 'Bole Medhanealem, Addis Ababa',
    deliveryMethod: 'standard',
    notes: 'Please call before arrival',
  };

  const message = buildWhatsAppOrderMessage(items, checkout);
  assert.ok(message.includes('Abebe Kebede'));
  assert.ok(message.includes('0911223344'));
  assert.ok(message.includes('Bole Medhanealem'));
  assert.ok(message.includes('Aura Sage Parfum'));
  assert.ok(message.includes('3,800 ETB'));
  assert.ok(message.includes('Please call before arrival'));
  assert.ok(message.includes('Standard Addis Ababa Delivery'));
});

test('createWhatsAppOrderUrl constructs a valid wa.me URL targeting Ethiopia phone number', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'p1-50',
      perfume: samplePerfume,
      selectedSizeMl: 50,
      priceEtb: 3800,
      quantity: 1,
    },
  ];
  const checkout: CheckoutDetails = {
    customerName: 'Sara T.',
    phone: '0922334455',
    deliveryLocation: 'Kazanchis, Addis Ababa',
    deliveryMethod: 'pickup',
  };

  const url = createWhatsAppOrderUrl(items, checkout);
  assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=`));
  assert.ok(url.includes(encodeURIComponent('Sara T.')));
  assert.ok(url.includes(encodeURIComponent('ZI PERFUME')));
});
