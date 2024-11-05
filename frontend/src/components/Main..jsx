import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import ProductModal from './ProductModal';
import "./Main.css";
import { useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import AddProduct from './AddProduct';


const Main = () => {
  const [products, setProducts] = useState([]); 
  const [displayedProducts, setDisplayedProducts] = useState([]); // State for products to display
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1); 
  const [pageSize, setPageSize] = useState(5); 
  const [total, setTotal] = useState(0); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false); // State for the modal

  const isAuthenticated = useSelector((state)=>state.auth.token)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:6060/api/product', {
          params: { page, pageSize },
        });
        
        const { products: productList, total: totalItems } = response.data;
        setProducts(productList);
        setDisplayedProducts(productList); // Initialize displayed products with all products
        setTotal(totalItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // If search query is cleared, reset displayedProducts to show all products
    if (query === '') {
      setDisplayedProducts(products);
    }
  };

  const handleSearchClick = () => {
    // Filter products based on the search query and set it to displayed products
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <div className="product-list">
      <div className="search">
        <input 
          type="text" 
          placeholder="Search for products..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <div className="cards" key={product.id}>
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: R{product.price}</p>
              <div className="cardBtns">
                <button onClick={() => handleViewDetails(product)}><FaEye/></button>
                {isAuthenticated && (
                  <button className='addToCartBtn'><TiShoppingCart/></button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-card">
          <p>No products match your search.</p>
        </div>
      )}

      <div className="pagination">
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            <FaAngleDoubleLeft />
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}

      {/* {isAuthenticated && (
  <div className="floatingAddBtn">
    <button aria-label="Add to cart">+</button>
  </div>
)} */}
 {/* Other components and code */}

 {isAuthenticated && (
        <div className="floatingAddBtn">
          <button onClick={openAddProductModal}>+</button>
        </div>
      )}

      {isAddProductModalOpen && <AddProduct onClose={closeAddProductModal} />} {/* Render the AddProduct modal */}

    </div>
  );
};

export default Main;
