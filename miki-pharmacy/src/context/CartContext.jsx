import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Add product to cart
  function addToCart(product, quantity = 1) {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  }

  // Remove product
  function removeFromCart(productId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  // Change quantity
  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  // Total number of products
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Total price
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
