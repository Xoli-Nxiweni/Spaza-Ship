import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, resetAddProductState } from '../Redux/addProductSlice';
import './AddProduct.css';

// eslint-disable-next-line react/prop-types
const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.addProduct);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    images: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(file => {
          formDataToSend.append(key, file);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    await dispatch(addProduct(formDataToSend));
    if (!error) {
      alert('Product added successfully!');
      onClose();
      dispatch(resetAddProductState());
    } else {
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product-modal">
      <h2>Add New Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="file" name="images" multiple onChange={handleFileChange} required />
        <div className="formButtons">
          <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
