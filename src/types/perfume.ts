export type FragranceCategory =
  | "All"
  | "Men's Fragrances"
  | "Women's Fragrances"
  | "Unisex Fragrances"
  | "Luxury Collection"
  | "Fresh & Everyday"
  | "Gift Collection";

export interface BottleSizeOption {
  sizeMl: number;
  priceEtb: number;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: FragranceCategory;
  categorySlug: string;
  fragranceFamily: string;
  description: string;
  sizes: BottleSizeOption[];
  image: string;
  inStock: boolean;
  featured?: boolean;
  tag?: string;
}

export interface CartItem {
  cartItemId: string; // `${perfume.id}-${selectedSizeMl}`
  perfume: Perfume;
  selectedSizeMl: number;
  priceEtb: number;
  quantity: number;
}

export type DeliveryMethod = "pickup" | "standard" | "express";

export interface CheckoutDetails {
  customerName: string;
  phone: string;
  deliveryLocation: string;
  deliveryMethod: DeliveryMethod;
  notes?: string;
}
