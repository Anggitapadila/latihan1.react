import React, { useState, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext.jsx';
import './AdminDashboard.css';

function AdminDashboard() {
  const { products, loading, deleteProduct } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleEdit = (productId) => {
    // Navigate to edit page - assuming EditProduct component exists
    window.location.href = `/editproduct/${productId}`;
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProduct(productId);
    }
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
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <header className="admin-dashboard-header">
          <div className="header-content">
            <h1>🛠️ Admin Dashboard</h1>
            <p>Kelola produk aplikasi dengan mudah</p>
          </div>
        </header>

        <div className="admin-dashboard-content">
          <div className="content-header">
            <div className="header-actions">
              <h2>📦 Daftar Produk</h2>
              <button className="add-product-btn" onClick={() => window.location.href = '/addproduct'}>
                ➕ Tambah Produk
              </button>
            </div>
          </div>

          {/* GRID PRODUK */}
          <div className="product-grid-container">
            <div className="product-grid">
              {currentProducts.map((product) => (
                <div key={product.id} className="product-card admin-card">
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
                    <div className="admin-actions">
                      <button className="edit-btn" onClick={() => handleEdit(product.id)}>
                        ✏️ Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                        🗑️ Hapus
                      </button>
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
      </div>
    </div>
  );
}

export default AdminDashboard;
