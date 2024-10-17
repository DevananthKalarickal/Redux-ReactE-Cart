import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk('allProducts/fetchProducts', async () => {
  const result = await axios.get('https://dummyjson.com/products');
  localStorage.setItem("products", JSON.stringify(result.data.products));
  return result.data.products;
});



const productSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    productsDummy: [],
   // Added for storing individual product details
    loading: false,
    error: ""
  },
  reducers: {
    searchProduct: (state, action) => {
      // Filter products based on the search term (case-insensitive)
      state.products = state.productsDummy.filter(item => 
        item.title.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.productsDummy = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
        state.productsDummy = [];
        state.error = "API failed";
      })
   
  }
});

// Exporting the searchProduct action and the reducer
export const { searchProduct } = productSlice.actions;
export default productSlice.reducer;
