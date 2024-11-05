// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlice';
import loaderReducer from '../Redux/loaderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export default store;
