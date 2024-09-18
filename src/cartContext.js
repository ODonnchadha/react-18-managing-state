import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

// The default value would apply if a component tries 
//   consuming the context without a provider in a parent.
const CartContext = React.createContext(null);

// State initialization code: Run once upon initial load.
let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

// The provider determines what state and functions are shared via the context.
// We will share the cart data and cartReducer's dispatch.
export function CartProvider(props) {
  // Provider is responsible for calling useReducer.
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  
  const contextValue = {
    cart,
    dispatch,
  };

  // CartProvider's children will be able to access the cart and dispatch.
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

// Custom hook.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
