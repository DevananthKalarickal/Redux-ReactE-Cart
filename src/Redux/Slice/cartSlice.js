import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.Totalprice = existingProduct.price * existingProduct.quantity;
      } else {
        state.push({ ...product, quantity: 1, Totalprice: product.price });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    emptyCart: (state) => {
      return []; // Clear the cart
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions; // Ensure emptyCart is exported
export default cartSlice.reducer;
