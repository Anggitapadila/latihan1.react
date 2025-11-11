import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      {/* HEADER PRODUK */}
      <header className="product-header">
        <div className="header-container">
          <div className="header-text">
            <h1>🛍️ Daftar Produk</h1>
          </div>
          <button className="add-product-btn" onClick={() => navigate('/addproduct')}>
            ➕ Tambah Produk
          </button>
        </div>
      </header>

      {/* GRID PRODUK */}
      <div className="product-grid-container">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-image">
                <img src={product.thumbnail} alt={product.title} className="product-img" />
              </div>
              <div className="product-card-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <span className="product-price">${product.price}</span>
                  <span className="product-brand">{product.brand}</span>
                  <span className="product-category">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>⬅</button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>➡</button>
      </div>
    </div>
  );
}

export default Product;
