import { useState } from 'react';
import AuthModal from './auth';
import './Navbar.css';
import { MdFavoriteBorder } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <h1>SPAZA<span>SHIP</span></h1>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search for products..." />
        <button className="search-btn">Search</button>
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}>
        <li><a href="/home">PRODUCTS</a></li>
        <li><a href="/categories">CONTACT</a></li>
      </ul>

      {/* User Actions */}
      <div className="navbar-user-actions">
        <li><a href="/orders"><MdFavoriteBorder/></a></li>
        <li><a href="/cart"><BsCart4/></a></li>
        <AuthModal />
      </div>

      {/* Mobile Menu Toggle */}
      <button className="navbar-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
