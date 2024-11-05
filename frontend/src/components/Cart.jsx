// src/components/Cart.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeFromCart, updateQuantity, clearCart, setCartItems } from '../Redux/cartSlice';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, total } = useSelector((state) => state.cart);

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:6060/api/cart/');
                const { items, total } = response.data;
                dispatch(setCartItems({ items, total }));
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartItems();
    }, [dispatch]);

    const handleRemove = async (item) => {
        try {
            await axios.delete(`http://localhost:6060/api/cart/${item.id}`);
            dispatch(removeFromCart(item));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleUpdateQuantity = async (item, quantity) => {
        if (quantity < 1) return; // Prevent negative quantity
        try {
            await axios.put(`http://localhost:6060/api/cart/${item.id}`, { quantity });
            dispatch(updateQuantity({ id: item.id, quantity }));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete('http://localhost:6060/api/cart');
            dispatch(clearCart());
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Price: ${item.price}</p>
                                    <p>
                                        Quantity:
                                        <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                                    </p>
                                    <button onClick={() => handleRemove(item)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <button onClick={handleClearCart}>Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
