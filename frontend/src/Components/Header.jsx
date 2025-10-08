import { Link } from "react-router-dom";
import "./header.css";

// Placeholder icons (can replace with actual images)
import userIcon from "../assets/user-icon.png";
import ordersIcon from "../assets/orders-icon.png";
import cartIcon from "../assets/cart-icon.png";

export function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" alt="Logo" />
            <span className="logo-text">EKET</span>
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search products..." />
      </div>

      <div className="right-section">
        <Link className="header-item" to="/login">
          <img src={userIcon} className="icon" alt="Login" />
          Login / Sign Up
        </Link>

        <Link className="header-item" to="/orders">
          <img src={ordersIcon} className="icon" alt="Orders" />
          Orders
        </Link>

        <Link className="header-item" to="/checkout">
          <img src={cartIcon} className="icon" alt="Cart" />
          Cart
        </Link>
      </div>
    </div>
  );
}
