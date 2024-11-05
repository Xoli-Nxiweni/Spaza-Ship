// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loaderReducer from './loaderSlice'
import addProductReducer from './addProductSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    addProduct: addProductReducer,
  },
});

export default store;
