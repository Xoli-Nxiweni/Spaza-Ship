import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <h1>SPAZA<span>HUB</span></h1>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search for products..." />
        <button className="search-btn">Search</button>
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}>
        <li><a href="/home">Home</a></li>
        <li><a href="/categories">Categories</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/cart">Cart</a></li>
      </ul>

      {/* User Actions */}
      <div className="navbar-user-actions">
        <button className="btn btn-primary">Sign In</button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="navbar-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
