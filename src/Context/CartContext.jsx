import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Add product or increase quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, qty: type === "inc" ? p.qty + 1 : Math.max(1, p.qty - 1) }
          : p
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};
