// src/Redux/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array to hold cart items
    total: 0, // Total price of the cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.items.find(item => item.id === action.payload.id);
            if (itemExists) {
                itemExists.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.total += action.payload.price * action.payload.quantity;
        },
        removeFromCart: (state, action) => {
            const itemToRemove = state.items.find(item => item.id === action.payload.id);
            if (itemToRemove) {
                state.total -= itemToRemove.price * itemToRemove.quantity;
                state.items = state.items.filter(item => item.id !== action.payload.id);
            }
        },
        updateQuantity: (state, action) => {
            const itemToUpdate = state.items.find(item => item.id === action.payload.id);
            if (itemToUpdate) {
                state.total -= itemToUpdate.price * itemToUpdate.quantity;
                itemToUpdate.quantity = action.payload.quantity;
                state.total += itemToUpdate.price * itemToUpdate.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        // New action to set cart items directly
        setCartItems: (state, action) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
        },
    },
});

// Export actions and reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
