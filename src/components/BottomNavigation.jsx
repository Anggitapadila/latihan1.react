import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

function BottomNavigation({ userRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bottom-navigation">
      <div className="nav-container">
        {/* Beranda Tab */}
        <button
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => handleNavigation('/')}
        >
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Beranda</div>
        </button>

        {/* Tentang Tab */}
        <button
          className={`nav-item ${isActive('/about-products') ? 'active' : ''}`}
          onClick={() => handleNavigation('/about-products')}
        >
          <div className="nav-icon">📋</div>
          <div className="nav-label">Tentang</div>
        </button>

        {/* Profile Tab - Conditional based on role */}
        {userRole === 'user' && (
          <button
            className={`nav-item ${isActive('/user') ? 'active' : ''}`}
            onClick={() => handleNavigation('/user')}
          >
            <div className="nav-icon">👤</div>
            <div className="nav-label">Profile</div>
          </button>
        )}

        {userRole === 'admin' && (
          <button
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => handleNavigation('/admin')}
          >
            <div className="nav-icon">⚙️</div>
            <div className="nav-label">Admin</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default BottomNavigation;
