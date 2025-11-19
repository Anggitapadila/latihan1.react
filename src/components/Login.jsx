import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    if (!email.includes('@')) {
      setError('Email tidak valid');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (email.toLowerCase().includes('admin')) {
      if (password !== 'admin123') {
        setError('Password admin salah. Gunakan "admin123"');
        return;
      }
    }
    navigate('/about-products');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Login KlikMall</h1>
          <p>Masukkan email dan password Anda</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn">
            Masuk
          </button>
        </form>

        <div className="login-footer">
          <p>Selamat datang di platform produk modern</p>
          <div className="login-info">
            <small><strong>Login Admin:</strong> Email mengandung "admin", Password: "admin123"</small>
            <small><strong>Login User:</strong> Email apa saja, Password minimal 6 karakter</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
