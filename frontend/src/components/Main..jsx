import './Main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const [page, setPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5); // Number of items per page
  const [total, setTotal] = useState(0); // Total number of products

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:6060/api/product', {
          params: { page, pageSize }, // Pass pagination params
        });
        
        console.log('API response:', response.data); // Check response structure
        const { products: productList, total: totalItems } = response.data;

        setProducts(productList);
        setTotal(totalItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]); // Re-run when page or pageSize changes

  const totalPages = Math.ceil(total / pageSize);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}

      <div className="pagination">
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
