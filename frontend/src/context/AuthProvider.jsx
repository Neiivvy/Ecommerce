// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // stores user info
  const [token, setToken] = useState(null); // stores JWT token
  const [cart, setCart] = useState([]);     // stores current user's cart

  // On initial load, check localStorage for token/user
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch cart from DB whenever user logs in / changes
  useEffect(() => {
    const fetchCartFromDB = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`http://localhost:5000/cart/${user.id}`);
        setCart(response.data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    fetchCartFromDB();
  }, [user]);

  // Add item to cart (state + DB)
  const addToCart = async (product) => {
    if (!user) return;

    try {
      // Check if product already in cart
      const exists = cart.find((item) => item.id === product.id);
      if (exists) return;

      // Add to DB
      await axios.post("http://localhost:5000/cart", {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      });

      // Add to state
      setCart((prev) => [...prev, product]);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  // Remove item from cart (state + DB)
  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      // Find cart item ID from DB response (you may need cart table ID)
      const cartItem = cart.find((item) => item.id === productId);
      if (!cartItem) return;

      await axios.delete(`http://localhost:5000/cart/${cartItem.cartId || cartItem.id}`);

      // Remove from state
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        cart,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
