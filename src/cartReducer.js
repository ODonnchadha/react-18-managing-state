// Type property is always required from an action. Other properties can be added.
// QUESTION: How do we reference the current state in the reducer?
// ANSWER: The first parameter always represents the current state.
export default function cartReducer(cart, action) {
  // Each time React invokes the Reducer, it passes in the current state as the first argument.
  switch (action.type) {
    case "add":
      // QUESTION: How do we pass arguments?
      // ANSWER: We can pass arguments as properties on the action. (Type is required.)
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with the matching item replaced.
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with the new item appended.
        return [...cart, { id, sku, quantity: 1 }];
    }
    // Whatever we return from useReducer becomes the new state.
    // Curly-braces offer up a seperate scope within a function.
    // Use when you have the same local variable names. e.g.: sku.
    case "empty": {
      return [];
    }
    case "updateQuantity": {
      const { quantity, sku } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
