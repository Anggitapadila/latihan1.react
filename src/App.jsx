import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import ProductAbout from "./components/ProductAbout";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Menu from "./components/Menu";
import Login from "./components/Login";

import { ProductProvider } from "./contexts/ProductContext.jsx";

// routing all app 
function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/admin" element={<><Menu /><AdminDashboard /></>} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/products" element={<Product />} />
            <Route path="/about-products" element={<ProductAbout />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
