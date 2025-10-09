import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // keep your existing path

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

  // Function to log out user
  const logout = () => {
    setToken(null);
    setUser(null);
    setCart([]); // clear cart on logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
};
