// Loader.js
import React from 'react';
import { useSelector } from 'react-redux';
import './Loader.css'; // Style your loader component

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
