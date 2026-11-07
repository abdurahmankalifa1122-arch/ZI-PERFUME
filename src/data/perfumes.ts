import { FragranceCategory, Perfume } from '../types/perfume';

export interface CategoryCardData {
  id: string;
  name: FragranceCategory;
  tagline: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryCardData[] = [
  {
    id: 'mens',
    name: "Men's Fragrances",
    tagline: 'Bold, structured, and distinguished',
    description: 'Distinctive accords of smoked woods, noble vetiver, and crisp aromatics designed for sophisticated presence.',
    image: '/src/assets/images/collection_mens_fragrance_1794041259772.jpg',
  },
  {
    id: 'womens',
    name: "Women's Fragrances",
    tagline: 'Luminous, graceful, and captivating',
    description: 'Radiant floral bouquets, creamy amber, and delicate crystalline notes celebrating timeless elegance.',
    image: '/src/assets/images/collection_womens_fragrance_1794041260462.jpg',
  },
  {
    id: 'unisex',
    name: "Unisex Fragrances",
    tagline: 'Artisanal balance beyond boundaries',
    description: 'Harmonious blends of sunlit citrus, resinous woods, and rich spices crafted to harmonize on any skin.',
    image: '/src/assets/images/collection_unisex_fragrance_1794041344356.jpg',
  },
  {
    id: 'luxury',
    name: 'Luxury Collection',
    tagline: 'Rare extraits and high perfumery',
    description: 'Masterpiece compositions enriched with precious absolutes, golden amber, and exquisite longevity.',
    image: '/src/assets/images/campaign_editorial_perfume_1794041258537.jpg',
  },
  {
    id: 'fresh-everyday',
    name: 'Fresh & Everyday',
    tagline: 'Clean, effortless, and revitalizing',
    description: 'Crisp green herbs, uplifting bergamot, and airy musk perfect for daytime refinement in Addis Ababa.',
    image: '/src/assets/images/hero_luxury_perfume_1794041257491.jpg',
  },
  {
    id: 'gift',
    name: 'Gift Collection',
    tagline: 'Unforgettable gestures of luxury',
    description: 'Presented in signature emerald and champagne gold presentation coffrets, ideal for milestone celebrations.',
    image: '/src/assets/images/collection_gift_set_1794041344502.jpg',
  },
];

/**
 * SAMPLE PRODUCT CATALOG (DEMONSTRATION)
 * Easily editable: store owners can update names, prices (ETB), bottle sizes, and categories.
 */
export const SAMPLE_PERFUMES: Perfume[] = [
  {
    id: 'aura-sage',
    name: 'Aura Sage Parfum',
    brand: 'ZI Fragrance Signature',
    category: 'Fresh & Everyday',
    categorySlug: 'fresh-everyday',
    fragranceFamily: 'Aromatic Botanical & Crisp Sage',
    description:
      'A luminous botanical creation featuring wild Ethiopian highland herbs, crisp French bergamot, and earthy Haitian vetiver resting on a bed of velvety white cedar.',
    sizes: [
      { sizeMl: 50, priceEtb: 3850 },
      { sizeMl: 100, priceEtb: 5400 },
    ],
    image: '/src/assets/images/hero_luxury_perfume_1794041257491.jpg',
    inStock: true,
    featured: true,
    tag: 'Signature Scent',
  },
  {
    id: 'emeraude-doree',
    name: 'Émeraude Dorée Extrait',
    brand: 'ZI Private Reserve',
    category: 'Luxury Collection',
    categorySlug: 'luxury',
    fragranceFamily: 'Amber Balsamic & Royal Jasmine',
    description:
      'An opulent luxury extrait blending shimmering night-blooming jasmine, golden resinous amber, warm myrrh, and rare bourbon vanilla for an enduring, unforgettable aura.',
    sizes: [
      { sizeMl: 50, priceEtb: 5900 },
      { sizeMl: 100, priceEtb: 8200 },
    ],
    image: '/src/assets/images/campaign_editorial_perfume_1794041258537.jpg',
    inStock: true,
    featured: true,
    tag: 'Haute Parfumerie',
  },
  {
    id: 'cyprus-vestige',
    name: 'Cyprus Vestige Eau de Parfum',
    brand: 'ZI Pour Homme',
    category: "Men's Fragrances",
    categorySlug: 'mens',
    fragranceFamily: 'Smoked Woods, Juniper & Cypress',
    description:
      'A commanding masculine profile layered with aromatic blue juniper, dark smoked cedarwood, crushed peppercorn, and warm leather undertones.',
    sizes: [
      { sizeMl: 50, priceEtb: 4200 },
      { sizeMl: 100, priceEtb: 5950 },
    ],
    image: '/src/assets/images/collection_mens_fragrance_1794041259772.jpg',
    inStock: true,
    featured: true,
    tag: 'Customer Favorite',
  },
  {
    id: 'maison-eclat',
    name: 'Maison Éclat Luminous Floral',
    brand: 'ZI Pour Femme',
    category: "Women's Fragrances",
    categorySlug: 'womens',
    fragranceFamily: 'Luminous White Floral & Soft Peach',
    description:
      'An ethereal, sun-drenched floral fantasy intertwining velvet white peony petals, Bulgarian rose de mai, delicate nectarine blossom, and clean crystalline musk.',
    sizes: [
      { sizeMl: 50, priceEtb: 4100 },
      { sizeMl: 100, priceEtb: 5800 },
    ],
    image: '/src/assets/images/collection_womens_fragrance_1794041260462.jpg',
    inStock: true,
    featured: true,
    tag: 'Romantic Floral',
  },
  {
    id: 'essence-nocturne',
    name: 'Essence Nocturne Niche Extrait',
    brand: 'ZI Unisex Collection',
    category: 'Unisex Fragrances',
    categorySlug: 'unisex',
    fragranceFamily: 'Spiced Bergamot & Warm Ambergris',
    description:
      'A modern masterpiece crafted for connoisseurs. Fresh Italian bergamot seamlessly transitions into a heart of rich cardamon, warm tonka bean, and salty ambergris.',
    sizes: [
      { sizeMl: 50, priceEtb: 4600 },
      { sizeMl: 100, priceEtb: 6500 },
    ],
    image: '/src/assets/images/collection_unisex_fragrance_1794041344356.jpg',
    inStock: true,
    featured: true,
    tag: 'Niche Artisanal',
  },
  {
    id: 'royal-coffret-duo',
    name: 'Royal Heritage Coffret Duo Set',
    brand: 'ZI Special Edition',
    category: 'Gift Collection',
    categorySlug: 'gift',
    fragranceFamily: 'Dual Luxury Flacons (50ml + 50ml)',
    description:
      'An exquisite collector presentation box lined in champagne satin containing two complementary 50ml flacons: Émeraude Dorée and Aura Sage Parfum. Perfect for gifting.',
    sizes: [
      { sizeMl: 100, priceEtb: 9400 },
    ],
    image: '/src/assets/images/collection_gift_set_1794041344502.jpg',
    inStock: true,
    featured: true,
    tag: 'Luxury Gift Set',
  },
];
