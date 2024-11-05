import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  isAuthModalOpen: false,
  isSignUp: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:6060/api/user', userData);
    return response.data; // Assuming your API returns the user and token
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Failed to register');
  }
});

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:6060/api/user/login', userData);
    return response.data; // Assuming your API returns the user and token
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Failed to login');
  }
});

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
        state.user = action.payload.data; // Set the user data from response
        state.token = action.payload.token; // Set the token from response
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
        state.user = action.payload.data; // Set the user data from response
        state.token = action.payload.token; // Set the token from response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from API response
      });
  },
});

// Export actions and reducer
export const { toggleAuthModal, toggleAuthMode, closeAuthModal, logout } = authSlice.actions;
export default authSlice.reducer;
