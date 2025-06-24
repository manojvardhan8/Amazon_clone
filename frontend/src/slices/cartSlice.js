// frontend/src/slices/cartSlice.js (Simplified)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Start with an empty array
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // This action will be called when the getCart query is successful
    setCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
    // This can be used to clear the cart on logout
    clearCartItems: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;