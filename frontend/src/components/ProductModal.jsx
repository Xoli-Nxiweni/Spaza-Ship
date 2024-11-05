import React from 'react';
import './ProductModal.css'; // Make sure to import your CSS styles

const ProductModal = ({ product, onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="product-modal">
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-content">
          {product.image && <img src={product.image} alt={product.name} className="product-image" />}
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: <span>${product.price}</span></p>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Close</button>
          <button>{"add to favorites"}</button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
