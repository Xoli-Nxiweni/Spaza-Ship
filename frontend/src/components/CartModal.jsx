// src/components/CartModal.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import Cart from './Cart'; // Import your Cart component
import './CartModal.css'; // Create your own styles for the modal

const CartModal = ({ onClose }) => {
    return (
        <div className="cart-modal">
            <button className="close-modal" onClick={onClose}>Close</button>
            <Cart />
        </div>
    );
};

export default CartModal;
