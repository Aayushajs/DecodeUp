export const API_MESSAGES = {
    // Success messages
    REQUEST_SUCCESSFUL: 'Request successful',
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    CART_ITEM_ADDED: 'Item added to cart successfully',
    CART_ITEM_REMOVED: 'Item removed from cart successfully',

    // Error messages
    PRODUCT_NOT_FOUND: (id: number) => `Product with ID ${id} not found`,
    CART_ITEM_NOT_FOUND: (id: number) => `Cart item with ID ${id} not found`,
    QUANTITY_MIN: 'Quantity must be at least 1',
    INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;
