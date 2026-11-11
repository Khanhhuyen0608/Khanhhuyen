export type ProductCategory = 'all' | 'blouse' | 'skirt' | 'dress' | 'suit' | 'trousers';

export type PatternType = 'all' | 'polka_dot' | 'plaid' | 'ditsy_floral' | 'lace' | 'solid';

export type MaterialType = 'all' | 'linen' | 'cotton' | 'silk' | 'knitwear';

export type ColorTone = 'all' | 'cream_beige' | 'rust_brown' | 'white_ivory' | 'charcoal_black';

export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export interface ColorVariant {
  id: string;
  name: string;
  colorTone: ColorTone;
  colorHex: string;
  images: string[]; // [modelPhoto, productPhoto]
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  category: ProductCategory;
  categoryName: string;
  pattern: PatternType;
  patternName: string;
  material: MaterialType;
  materialName: string;
  colorTone: ColorTone;
  colorName: string;
  colorVariants?: ColorVariant[];
  images: string[];
  description: string;
  features: string[];
  stylingTips: string;
  careInstructions: string[];
  sizes: ProductSize[];
  sizeStock: Partial<Record<ProductSize, number>>;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  seoAlt: string;
  sku: string;
}

export interface CartItem {
  id: string; // unique item key: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: ProductSize;
  selectedColor?: string;
  selectedImage?: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  province: string;
  district: string;
  address: string;
  note?: string;
  paymentMethod: 'cod' | 'banking';
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  createdAt: string;
  trackingCode: string;
}

export interface Voucher {
  code: string;
  name: string;
  discountType: 'fixed' | 'percent';
  discountValue: number;
  minOrder: number;
  description: string;
}

export interface FilterState {
  category: ProductCategory;
  pattern: PatternType;
  material: MaterialType;
  colorTone: ColorTone;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'popular';
}
