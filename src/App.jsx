import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/product";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
