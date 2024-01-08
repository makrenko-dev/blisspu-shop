import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const lastUpdateTime = localStorage.getItem('cartLastUpdateTime') || 0;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const [cart, setCart] = useState(storedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prevIsOpen) => !prevIsOpen);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const increaseQuantity = (id, color) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.colors[0]?.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, color) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.colors[0]?.color === color && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCartInLocalStorage = () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartLastUpdateTime');
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
    // Check if more than 24 hours have passed since the last update
    if (currentTime - lastUpdateTime > oneDayInMilliseconds) {
      clearCart(); // Clear the cart if more than 24 hours have passed
      clearCartInLocalStorage(); // Clear cart in localStorage
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    // Update the last update time
    localStorage.setItem('cartLastUpdateTime', currentTime.toString());
  }, [cart, lastUpdateTime]);

  useEffect(() => {
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
        updateCart,
        increaseQuantity,
        decreaseQuantity,
        clearCartInLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
