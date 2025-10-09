import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // make sure path is correct



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // stores user info
  const [token, setToken] = useState(null); // stores JWT token

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
