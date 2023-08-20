import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NativeBar from "./Components/NativeBar";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
//import CarouselImage from "./pages/CarouselImage";
export default function App() {
  return (
    <div>
      <NativeBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productID" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
