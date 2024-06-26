import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Cart from "./Cart";
import Detail from "./Detail";
import Products from "./Products";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route  path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route  path="/cart" element={<Cart />} />
            <Route  path="/:category" element={<Products />} />
            <Route  path="/:category/:id" element={<Detail />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
