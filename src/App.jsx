import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes  } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Detail from "./Detail";
// import Detail from "./DetailRefs";
import { useCart } from "./cartContext";

// Display the product's category in the URL using a placeholder.
export default function App() {
  const { dispatch } = useCart();
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
