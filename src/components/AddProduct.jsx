import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext.jsx";
import "../App.css";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: null,
  });

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Menangani upload file gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, thumbnail: imageUrl });
    }
  };

  // Menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(result => {
      console.log("Produk ditambahkan:", result);
      addProduct(result); // Update context
      alert("✅ Produk berhasil ditambahkan!");
      navigate("/"); // kembali ke halaman produk
    })
    .catch(error => {
      console.error("Error menambahkan produk:", error);
      alert("❌ Gagal menambahkan produk. Silakan coba lagi.");
    });
  };

  // Tombol batal → kembali ke halaman utama (dashboard)
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-product-page">
      <div className="page-header">
        <h1>🧩 Tambah Produk</h1>
        <p>Isi data produk baru di bawah ini</p>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Nama Produk"
          value={product.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Harga Produk"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Kategori Produk"
          value={product.category}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit" className="save-btn">
          💾 Simpan Produk
        </button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          🔙 Kembali ke Halaman Utama
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
