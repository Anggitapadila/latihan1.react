import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine user role based on current path
  const isUser = location.pathname === '/user';
  const isAdmin = location.pathname === '/admin' || location.pathname === '/addproduct' || location.pathname === '/products';

  return (
    <nav className="app-menu">
      <div className="menu-container">
        <div className="menu-logo">
          <h2>🛍️ Anggita</h2>
        </div>
        <ul className="menu-list">
          <li>
            <button className="menu-btn" onClick={() => navigate('/')}>
              🏠 Beranda
            </button>
          </li>
          {isUser && (
            <>
              <li>
                <button className="menu-btn" onClick={() => navigate('/user')}>
                  👤 Dasbor Pengguna
                </button>
              </li>
              <li>
                <span className="menu-info">Mode Lihat Saja</span>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li>
                <button className="menu-btn" onClick={() => navigate('/admin')}>
                  👨‍💼 Dasbor Admin
                </button>
              </li>
              <li>
                <button className="menu-btn" onClick={() => navigate('/addproduct')}>
                  ➕ Tambah Produk
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
