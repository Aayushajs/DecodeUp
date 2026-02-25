export class CartItemResponseDto {
    id: number;
    productId: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}

export class CartResponseDto {
    items: CartItemResponseDto[];
    totalItems: number;
    totalPrice: number;
}
