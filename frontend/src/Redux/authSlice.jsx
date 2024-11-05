import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showLoader, hideLoader } from './loaderSlice';

// Define the initial state
const initialState = {
  isAuthModalOpen: false,
  isSignUp: false,
  user: null,
  token: localStorage.getItem('token') || null, // Load token from local storage
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:6060/api/user', userData);
      return response.data; // Assuming API returns user data
    } catch (error) {
      console.error('Registration error:', error.response.data);
      return rejectWithValue(error.response.data.message || 'Failed to register');
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader()); // Show loader before async request
      const response = await axios.post('http://localhost:6060/api/user/login', userData);
      return response.data; // Assuming API returns user data and token
    } catch (error) {
      console.error('Login error:', error.response.data);
      return rejectWithValue(error.response.data.message || 'Failed to login');
    } finally {
      dispatch(hideLoader()); // Hide loader after async request completes
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      state.isSignUp = false; // Reset to Sign-In mode when opening
    },
    toggleAuthMode: (state) => {
      state.isSignUp = !state.isSignUp;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear token from local storage on logout
    },
    toggleProfileModal(state) {
      state.isProfileModalOpen = !state.isProfileModalOpen; // Toggles the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set the user data from response
        // If your API returns a token on registration, uncomment the next line
        // state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Save token to local storage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from API response
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set the user data from response
        state.token = action.payload.token; // Set the token from response
        localStorage.setItem('token', action.payload.token); // Save token to local storage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from API response
      });
  },
});

// Export actions and reducer
export const { toggleProfileModal, toggleAuthModal, toggleAuthMode, closeAuthModal, logout } = authSlice.actions;
export default authSlice.reducer;
