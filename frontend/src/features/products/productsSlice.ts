import { createSlice } from '@reduxjs/toolkit';

interface ProductsState {
  searchTerm: string;
}

const initialState: ProductsState = {
  searchTerm: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
