import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext.jsx';
import './ProductAbout.css';

function ProductAbout() {
  const navigate = useNavigate();
  const { products, loading, deleteProduct } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    return uniqueBrands.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      return matchesCategory && matchesBrand;
    });
  }, [products, selectedCategory, selectedBrand]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Memuat data produk...</p>
      </div>
    );
  }

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProduct(productId);
    }
  };

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

      <div className="filters-section">
        <div className="filter-container">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="category-select">Kategori:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="brand-select">Brand:</label>
              <select
                id="brand-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="filter-select"
              >
                <option value="">Semua Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <button className="add-product-btn" onClick={() => navigate('/addproduct')}>
                ➕ Tambah Produk
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-about-container">
        <div className="product-list">
          {filteredProducts.map((product) => (
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

export default ProductAbout;
