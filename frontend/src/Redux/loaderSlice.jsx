// loaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the loader
const initialState = {
  isLoading: false,
};

// Create the loader slice
const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions and reducer
export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
