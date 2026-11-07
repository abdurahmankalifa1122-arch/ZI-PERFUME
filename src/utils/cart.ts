import { CartItem, CheckoutDetails, DeliveryMethod } from '../types/perfume';

export const BUSINESS_PHONE_LOCAL = '0909236008';
export const BUSINESS_PHONE_INTL = '+251909236008';
export const WHATSAPP_INTL_NUMBER = '251909236008';

export const FREE_DELIVERY_THRESHOLD = 5000; // ETB

export const DELIVERY_FEES: Record<DeliveryMethod, { label: string; fee: number; description: string }> = {
  pickup: {
    label: 'Store Pick-up (Bole FM Building)',
    fee: 0,
    description: 'Pick up in person at FM Building 2nd Floor, Room #214, Bole',
  },
  standard: {
    label: 'Standard Addis Ababa Delivery',
    fee: 250,
    description: 'Delivered within 24–48 hours across Addis Ababa',
  },
  express: {
    label: 'Express Same-Day Delivery',
    fee: 450,
    description: 'Priority courier within Addis Ababa (orders placed before 3 PM)',
  },
};

/**
 * Formats a numeric price into Ethiopian Birr string (e.g., "4,850 ETB")
 */
export function formatEtb(amount: number): string {
  const rounded = Math.round(amount);
  return `${rounded.toLocaleString('en-US')} ETB`;
}

/**
 * Calculates cart subtotal
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceEtb * item.quantity, 0);
}

/**
 * Calculates delivery fee based on method and subtotal
 */
export function calculateDeliveryFee(method: DeliveryMethod, subtotal: number): number {
  if (method === 'pickup') {
    return 0;
  }
  if (method === 'standard' && subtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return DELIVERY_FEES[method].fee;
}

/**
 * Calculates final total
 */
export function calculateTotal(items: CartItem[], method: DeliveryMethod): {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isFreeDelivery: boolean;
} {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = calculateDeliveryFee(method, subtotal);
  const isFreeDelivery = method === 'standard' && subtotal >= FREE_DELIVERY_THRESHOLD;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    isFreeDelivery,
  };
}

/**
 * Prepares formatted WhatsApp message for ordering
 */
export function buildWhatsAppOrderMessage(
  items: CartItem[],
  checkout: CheckoutDetails
): string {
  const { subtotal, deliveryFee, total, isFreeDelivery } = calculateTotal(items, checkout.deliveryMethod);
  const deliveryInfo = DELIVERY_FEES[checkout.deliveryMethod];

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.perfume.name}* (${item.selectedSizeMl}ml)\n` +
        `   Brand: ${item.perfume.brand}\n` +
        `   Qty: ${item.quantity} × ${formatEtb(item.priceEtb)} = *${formatEtb(item.priceEtb * item.quantity)}*`
    )
    .join('\n\n');

  const deliveryFeeText =
    checkout.deliveryMethod === 'pickup'
      ? 'Free (Store Pick-up)'
      : isFreeDelivery
      ? 'FREE (Order over 5,000 ETB Promo)'
      : formatEtb(deliveryFee);

  const notesText = checkout.notes?.trim() ? `\n*Special Notes:* ${checkout.notes.trim()}` : '';

  return (
    `*NEW ORDER — ZI PERFUME*\n` +
    `_Bole, Addis Ababa, Ethiopia_\n` +
    `--------------------------------\n\n` +
    `*Customer Details:*\n` +
    `• Name: *${checkout.customerName.trim()}*\n` +
    `• Phone: *${checkout.phone.trim()}*\n` +
    `• Location: *${checkout.deliveryLocation.trim()}*\n` +
    `• Delivery Method: *${deliveryInfo.label}*\n\n` +
    `*Selected Fragrances:*\n` +
    `${itemsList}\n\n` +
    `--------------------------------\n` +
    `*Subtotal:* ${formatEtb(subtotal)}\n` +
    `*Delivery:* ${deliveryFeeText}\n` +
    `*TOTAL ESTIMATE:* *${formatEtb(total)}*${notesText}\n\n` +
    `_Sent via ZI PERFUME Online Fragrance Store_`
  );
}

/**
 * Creates encoded WhatsApp URL for direct ordering
 */
export function createWhatsAppOrderUrl(
  items: CartItem[],
  checkout: CheckoutDetails
): string {
  const message = buildWhatsAppOrderMessage(items, checkout);
  return `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates direct WhatsApp quick inquiry URL for a specific perfume
 */
export function createPerfumeInquiryUrl(perfumeName: string, sizeMl?: number): string {
  const msg = `Hello ZI PERFUME, I would like to inquire about the availability and details for *${perfumeName}*${
    sizeMl ? ` (${sizeMl}ml)` : ''
  }. Could you assist me with pricing and order?`;
  return `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(msg)}`;
}
