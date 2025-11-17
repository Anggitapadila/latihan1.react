import React, { useState, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext.jsx';
import './Product.css';

function Product() {
  const { products, loading } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

    if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Memuat data produk...</p>
      </div>
    );
  }
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-about-page">
      <div className="page-header">
        <h1>📋 Daftar Produk & Detail</h1>
        <p>Klik pada produk untuk melihat detail lengkap</p>
      </div>

      <div className="product-about-container">
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-about-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-about-image">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="product-about-info">
                <h3>{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-brand">{product.brand}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-description-short">
                  {product.description.substring(0, 100)}...
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProduct.title}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="product-detail-image">
                <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
              </div>
              <div className="product-detail-info">
                <div className="detail-row">
                  <strong>Harga:</strong> ${selectedProduct.price}
                </div>
                <div className="detail-row">
                  <strong>Brand:</strong> {selectedProduct.brand}
                </div>
                <div className="detail-row">
                  <strong>Kategori:</strong> {selectedProduct.category}
                </div>
                <div className="detail-row">
                  <strong>Rating:</strong> {selectedProduct.rating} ⭐
                </div>
                <div className="detail-row">
                  <strong>Stok:</strong> {selectedProduct.stock}
                </div>
                <div className="detail-row">
                  <strong>Diskon:</strong> {selectedProduct.discountPercentage}%
                </div>
                <div className="detail-description">
                  <strong>Deskripsi:</strong>
                  <p>{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
