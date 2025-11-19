import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1>🛍️KlikMall</h1>
          <p>Aplikasi Produk Modern</p>
        </header>

        <div className="home-content">
          <div className="about-section">
            <h2>Tentang KlikMall</h2>
            <p className="about-description">
              Anggita adalah platform modern untuk mengelola dan menjelajahi berbagai produk berkualitas tinggi.
              Kami menyediakan pengalaman terbaik dalam menemukan produk yang Anda butuhkan dengan mudah dan cepat.
            </p>

            <div className="rating-section">
              <h3>⭐ Rating & Kualitas</h3>
              <div className="rating-cards">
                <div className="rating-card">
                  <div className="rating-number">4.8</div>
                  <div className="rating-stars">★★★★★</div>
                  <div className="rating-label">Kualitas Produk</div>
                </div>
                <div className="rating-card">
                  <div className="rating-number">4.9</div>
                  <div className="rating-stars">★★★★★</div>
                  <div className="rating-label">Pengalaman User</div>
                </div>
                <div className="rating-card">
                  <div className="rating-number">4.7</div>
                  <div className="rating-stars">★★★★★</div>
                  <div className="rating-label">Layanan Support</div>
                </div>
              </div>
            </div>

            <div className="features-section">
              <h3>✨ Fitur Unggulan</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🔍</div>
                  <h4>Pencarian Canggih</h4>
                  <p>Temukan produk dengan mudah menggunakan filter dan pencarian canggih</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <h4>Dashboard Admin</h4>
                  <p>Kelola produk dengan dashboard yang user-friendly untuk administrator</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📱</div>
                  <h4>Responsive Design</h4>
                  <p>Akses dari berbagai perangkat dengan desain yang responsif</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔒</div>
                  <h4>Keamanan Terjamin</h4>
                  <p>Data Anda aman dengan sistem keamanan yang terdepan</p>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h3>📈 Statistik KlikMall</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Produk Tersedia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Pengguna Aktif</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Kategori Produk</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support Online</div>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h3>Mulai Jelajahi Produk Kami</h3>
              <p>Bergabunglah dengan ribuan pengguna yang telah mempercayai Anggita</p>
              <div className="cta-buttons">
                <button className="cta-btn primary-btn" onClick={() => navigate('/products')}>
                  🛍️ Jelajahi Produk
                </button>
                <button className="cta-btn secondary-btn" onClick={() => navigate('/login')}>
                  👤Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
