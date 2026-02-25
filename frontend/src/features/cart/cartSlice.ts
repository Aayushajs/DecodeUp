import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartUiState {
  isCartOpen: boolean;
  lastAddedProductId: number | null;
}

const initialState: CartUiState = {
  isCartOpen: false,
  lastAddedProductId: null,
};

const cartSlice = createSlice({
  name: 'cartUi',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    setLastAddedProduct(state, action: PayloadAction<number | null>) {
      state.lastAddedProductId = action.payload;
    },
  },
});

export const { toggleCart, openCart, closeCart, setLastAddedProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
