import { configureStore } from '@reduxjs/toolkit';
import productSlice from './Slice/productSlice'; 
import wishlistSlice from './Slice/wishlistSlice';
import cartSlice from './Slice/cartSlice'; // Make sure to import cartSlice

const store = configureStore({
  reducer: {
    productReducer: productSlice,
    wishlistReducer: wishlistSlice,
    cartReducer: cartSlice, // Ensure cartSlice is correctly imported
  },
});

export default store;
