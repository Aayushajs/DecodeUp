// ── Product Types ──────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// ── Cart Types ────────────────────────────────────────
export interface CartItemType {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface CartResponse {
  items: CartItemType[];
  totalItems: number;
  totalPrice: number;
}

// ── API Request Types ─────────────────────────────────
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}
