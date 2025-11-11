import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produk ditambahkan:", product);
    alert("✅ Produk berhasil ditambahkan (simulasi dummy data)");
    navigate("/"); // kembali ke halaman produk
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
          type="text"
          name="thumbnail"
          placeholder="URL Gambar Produk"
          value={product.thumbnail}
          onChange={handleChange}
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
