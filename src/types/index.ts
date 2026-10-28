export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  shortDescription: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  discountPercent?: number;
  specs: Record<string, string>;
  features: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

export interface OrderForm {
  fullName: string;
  phone: string;
  email: string;
  wilaya: string;
  commune: string;
  address: string;
  shippingMethod: 'home' | 'relay';
  paymentMethod: 'cod' | 'cib_edahabia';
  notes?: string;
}

export interface OrderConfirmation extends OrderForm {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}
