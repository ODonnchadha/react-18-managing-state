import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
// Entry point. All child components will be able to declare routes.
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

// If only a portion of the app needed the CartProvider,
//   we could wrap a child component.
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
