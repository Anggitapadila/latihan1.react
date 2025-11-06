// Import StrictMode dari React untuk mendeteksi masalah potensial dalam aplikasi
import { StrictMode } from 'react'
// Import createRoot dari react-dom/client untuk membuat root React
import { createRoot } from 'react-dom/client'
// Import file CSS global
import './index.css'
// Import komponen App utama
import App from './App.jsx'

// Buat root React di elemen dengan id 'root' dan render aplikasi
createRoot(document.getElementById('root')).render(
  // Bungkus aplikasi dengan StrictMode untuk debugging
  <StrictMode>
    {/* Render komponen App */}
    <App />
  </StrictMode>,
)
