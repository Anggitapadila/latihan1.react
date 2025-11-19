import React, { useState, useContext, useMemo } from 'react';
import { ProductContext } from '../contexts/ProductContext.jsx';
import './Product.css';

// Komponen utama untuk menampilkan daftar produk
function Product() {
  // Mengambil data produk dan status loading dari context
  const { products, loading } = useContext(ProductContext);
  // State untuk menyimpan produk yang dipilih untuk modal detail
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State untuk pencarian produk
  const [searchTerm, setSearchTerm] = useState('');
  // State untuk filter kategori
  const [selectedCategory, setSelectedCategory] = useState('');
  // State untuk filter brand
  const [selectedBrand, setSelectedBrand] = useState('');
  // State untuk halaman pagination saat ini
  const [currentPage, setCurrentPage] = useState(1);
  // Jumlah item per halaman
  const itemsPerPage = 12;

  // useMemo untuk memfilter produk berdasarkan pencarian, kategori, dan brand
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Cek apakah judul atau deskripsi cocok dengan kata kunci pencarian
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      // Cek apakah kategori cocok dengan filter yang dipilih
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      // Cek apakah brand cocok dengan filter yang dipilih
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand]);

  // Hitung total halaman berdasarkan produk yang difilter
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Hitung indeks awal untuk pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Ambil produk untuk halaman saat ini
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // useMemo untuk mendapatkan daftar kategori unik dari produk
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // useMemo untuk mendapatkan daftar brand unik dari produk
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    return uniqueBrands.sort();
  }, [products]);

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
    <div className="product-page">
      <div className="product-header">
        <div className="header-container">
          <div className="header-text">
            <h1>🛍️ Jelajahi Produk</h1>
            <p>Temukan produk terbaik untuk kebutuhan Anda</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-selects">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Semua Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="product-grid-container">
        <div className="product-grid">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-card-image">
                <img src={product.thumbnail} alt={product.title} className="product-img" />
              </div>
              <div className="product-card-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">
                  {product.description.substring(0, 80)}...
                </p>
                <div className="product-details">
                  <p className="product-price">${product.price}</p>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-category">{product.category}</p>
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {(() => {
            const pages = [];
            const delta = 2; // Number of pages to show around current page

            // Always show first page
            if (1 < currentPage - delta) {
              pages.push(
                <button key={1} className="page-btn" onClick={() => handlePageChange(1)}>
                  1
                </button>
              );
              if (2 < currentPage - delta) {
                pages.push(<span key="start-ellipsis" className="pagination-ellipsis">...</span>);
              }
            }

            // Show pages around current page
            for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
              pages.push(
                <button
                  key={i}
                  className={`page-btn ${currentPage === i ? 'active' : ''}`}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </button>
              );
            }

            // Always show last page
            if (totalPages > currentPage + delta) {
              if (totalPages - 1 > currentPage + delta) {
                pages.push(<span key="end-ellipsis" className="pagination-ellipsis">...</span>);
              }
              pages.push(
                <button key={totalPages} className="page-btn" onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
