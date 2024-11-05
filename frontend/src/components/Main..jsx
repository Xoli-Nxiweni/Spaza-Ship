import { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import ProductModal from "./ProductModal";
import AddProduct from "./AddProduct";
import "./Main.css";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false); // Loading state for Add to Cart
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.token);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:6060/api/product", {
          params: { page, pageSize },
        });
        const { products: productList, total: totalItems } = response.data;
        setProducts(productList);
        setDisplayedProducts(productList);
        setTotal(totalItems);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  // Pagination handlers
  const handleNextPage = () => page < totalPages && setPage(page + 1);
  const handlePreviousPage = () => page > 1 && setPage(page - 1);

  // Open and close Add Product modal
  const openAddProductModal = () => setAddProductModalOpen(true);
  const closeAddProductModal = () => setAddProductModalOpen(false);

  // View product details
  const handleViewDetails = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  // Handle search input change and update displayed products
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(products);
    }
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    setLoadingCart(true);
    try {
      const response = await axios.post("http://localhost:6060/api/cart/add", { productId: product.id });
      console.log("Product added to cart:", response.data); // Success response
    } catch (err) {
      // Log the error message for debugging
      console.error("Failed to add product to cart:", err.response?.data?.message || err.message);
      alert("Error adding product to cart: " + (err.response?.data?.message || "An unexpected error occurred"));
    } finally {
      setLoadingCart(false);
    }
  };
  

  // Render loading or error states
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <div className="product-list">
      {/* Search bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Product cards */}
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <div className="cards" key={product.id}>
            <div className="product-card">
              <div className="productImage">
              <img src={product.images[0]} alt="no image"/>
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: R{product.price}</p>
              
                {isAuthenticated && (
                  <div className="cardBtns">
                   <button onClick={() => handleViewDetails(product)}>
                   <FaEye />
                 </button>
                  <button
                    className="addToCartBtn"
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingCart}
                  >
                    {loadingCart ? "Adding..." : <TiShoppingCart />}
                  </button>
                  </div>
                )}
              
            </div>
          </div>
        ))
      ) : (
        <div className="empty-card">
          <p>No products match your search.</p>
        </div>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            <FaAngleDoubleLeft />
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
      {isAuthenticated && (
        <div className="floatingAddBtn">
          <button onClick={openAddProductModal}>+</button>
        </div>
      )}
      {isAddProductModalOpen && <AddProduct onClose={closeAddProductModal} />}
    </div>
  );
};

export default Main;
