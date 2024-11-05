import React, { useState } from 'react';
import './ProductModal.css'; // Make sure to import your CSS styles
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ProductModal = ({ product, onClose, onUpdate }) => {
  // Local state to manage product details
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const handleUpdate = async () => {
    const updatedProduct = {
      id: product.id,
      name,
      description,
      price,
      image,
    };

    try {
      // Make an API call to update the product
      const response = await axios.put(`http://localhost:6060/api/product/${product.id}`, updatedProduct);
      onUpdate(response.data); 
      onClose(); 
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="product-modal">
        <div className="modal-header">
          <h2 className="modal-title">Edit Product</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal"></button>
        </div>
        <div className="modal-content">
          {image && <img src={image} alt={name} className="product-image" />}
          
          <div className="form-group">
            <label htmlFor="product-name">Name:</label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-description">Description:</label>
            <textarea
              id="product-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-image">Image URL:</label>
            <input
              type="text"
              id="product-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={handleUpdate}>Update</button>
          <button className="action-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
