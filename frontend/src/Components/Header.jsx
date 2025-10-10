import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./header.css";

import userIcon from "../assets/user-icon.png";
import ordersIcon from "../assets/orders-icon.png";
import cartIcon from "../assets/cart-icon.png";

export function Header({ searchTerm, setSearchTerm }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" alt="Logo" />
          <span className="logo-text">EKET</span>
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="right-section">
        {user ? (
          <>
            <Link className="header-item" to="/">
              <span className="header-item">
                Hello, {user.name}
                <img src={userIcon} className="icon" alt="Login" />
              </span>
            </Link>
            <button className="header-item logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="header-item" to="/login">
            <img src={userIcon} className="icon" alt="Login" />
            Login / Sign Up
          </Link>
        )}

        <span
          className="header-item clickable"
          onClick={() => handleProtectedClick("/orders")}
        >
          <img src={ordersIcon} className="icon" alt="Orders" />
          Orders
        </span>

        <span
          className="header-item clickable"
          onClick={() => handleProtectedClick("/cart")}
        >
          <img src={cartIcon} className="icon" alt="Cart" />
          Cart
        </span>
      </div>
    </div>
  );
}
