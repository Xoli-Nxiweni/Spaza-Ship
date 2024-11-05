import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for adding a product
export const addProduct = createAsyncThunk('addProduct/add', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:6060/api/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        // Enhanced error handling
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Return specific error message from the server
        } else {
            return rejectWithValue('Failed to add product'); // Fallback error message
        }
    }
});

// Create a slice for product addition
const addProductSlice = createSlice({
    name: 'addProduct',
    initialState: {
        loading: false,
        error: null,
        newProduct: null, // Optional: Add a field to store the newly added product
    },
    reducers: {
        resetAddProductState: (state) => {
            state.loading = false;
            state.error = null;
            state.newProduct = null; // Reset new product state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true; // Set loading to true when request is initiated
                state.error = null; // Reset error on new request
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when fulfilled
                state.newProduct = action.payload; // Store the newly added product if needed
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Capture the error message
            });
    },
});

// Export the reset action
export const { resetAddProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
