import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext.jsx';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

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
    <div className="user-dashboard">
      {/* HEADER USER DASHBOARD */}
      <header className="user-header">
        <h1>🛍️ Anggita</h1>
        <p>Aplikasi Produk Modern</p>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          🏠 Kembali ke Beranda
        </button>
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
                <div className="user-note">
                  <small>Mode Lihat Saja - Hubungi Admin untuk perubahan</small>
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

export default UserDashboard;
