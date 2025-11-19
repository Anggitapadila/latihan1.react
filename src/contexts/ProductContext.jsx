import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// Membuat context untuk mengelola state produk
const ProductContext = createContext();

// Provider komponen yang menyediakan state dan fungsi produk ke komponen anak
const ProductProvider = ({ children }) => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState([]);
  // State untuk menunjukkan status loading
  const [loading, setLoading] = useState(true);

  // useEffect untuk memuat produk saat komponen pertama kali di-mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Mengambil data produk dari API dummyjson
        const res = await axios.get('https://dummyjson.com/products');
        const apiProducts = res.data.products || [];
        // Mengambil produk yang ditambahkan dari localStorage
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts') || '[]');
        // Menggabungkan produk dari API dan localStorage
        const combined = [...apiProducts, ...addedProducts];
        setProducts(combined);
      } catch (err) {
        console.error('Gagal memuat data:', err);
        // Jika API gagal, gunakan produk dari localStorage saja
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts') || '[]');
        setProducts(addedProducts);
      }
      // Set loading ke false setelah selesai memuat
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Fungsi untuk menambahkan produk baru
  const addProduct = (newProduct) => {
    // Jika produk tidak memiliki ID, buat ID baru berdasarkan timestamp
    if (!newProduct.id) {
      newProduct.id = Date.now();
    }
    // Ambil produk yang sudah disimpan dari localStorage
    const saved = JSON.parse(localStorage.getItem('addedProducts') || '[]');
    saved.push(newProduct);
    // Simpan kembali ke localStorage
    localStorage.setItem('addedProducts', JSON.stringify(saved));
    // Update state produk
    setProducts(prev => [...prev, newProduct]);
  };

  // Fungsi untuk menghapus produk berdasarkan ID
  const deleteProduct = (productId) => {
    // Ambil produk dari localStorage dan filter yang tidak sesuai ID
    let saved = JSON.parse(localStorage.getItem('addedProducts') || '[]');
    saved = saved.filter(product => product.id !== productId);
    // Simpan kembali ke localStorage
    localStorage.setItem('addedProducts', JSON.stringify(saved));
    // Update state produk
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  // Mengembalikan provider dengan value yang berisi state dan fungsi
  return (
    <ProductContext.Provider value={{ products, loading, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Ekspor context dan provider untuk digunakan di komponen lain
export { ProductContext, ProductProvider };
