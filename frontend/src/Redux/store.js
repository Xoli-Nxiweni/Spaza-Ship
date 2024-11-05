import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the path accordingly

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
