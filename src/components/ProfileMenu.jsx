import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (role) => {
    if (role === 'user') {
      navigate('/user');
    }
    setIsOpen(false);
  };

  const handleProducts = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleAboutProducts = () => {
    navigate('/about-products');
    setIsOpen(false);
  };

  return (
    <div className="profile-menu">
      <button className="profile-button" onClick={toggleMenu}>
        <span className="profile-icon">👤</span>
        <span className="profile-text">Profile</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <h4>Navigasi</h4>
            </div>

            <div className="dropdown-section">
              <h5>Akses</h5>
              <button className="dropdown-item" onClick={() => handleLogin('user')}>
                👤 Akses sebagai User
              </button>
              <button className="dropdown-item" onClick={handleProducts}>
                🛍️ Katalog Produk
              </button>
              <button className="dropdown-item" onClick={handleAboutProducts}>
                📋 Tentang Produk
              </button>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-footer">
              <small>
                <strong>User:</strong> user123
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileMenu;
