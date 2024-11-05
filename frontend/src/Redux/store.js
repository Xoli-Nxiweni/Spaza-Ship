// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loaderReducer from './loaderSlice'
import addProductReducer from './addProductSlice';
import cartReducer from './cartSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    addProduct: addProductReducer,
    cart: cartReducer,
  },
});

export default store;
