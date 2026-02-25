import { Product } from '../../products/entities/product.entity';

export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: Product;
}

export interface CartResponse {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}
