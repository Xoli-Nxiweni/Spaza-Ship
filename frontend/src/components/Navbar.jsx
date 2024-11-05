import { useState } from 'react';
import AuthModal from './auth';
import './Navbar.css';
import { CiBookmark } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Cart from './Cart'; // Import Cart directly

const Navbar = () => {
  const [isCartVisible, setIsCartVisible] = useState(false); // State for cart visibility

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible); // Toggle cart visibility
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <a href="#" onClick={() => window.location.reload()}><h1>SPAZA<span>SHIP</span></h1></a>
      </div>

      {/* User Actions */}
      <div className="navbar-user-actions">
        <li><a href="/orders"><CiBookmark /></a></li>
        <li><a href="#" onClick={handleCartClick}><BsCart4 /></a></li> {/* Cart icon */}
        <AuthModal />
      </div>

      {/* Render Cart Component if visible */}
      {isCartVisible && <Cart />}
    </nav>
  );
};

export default Navbar;
