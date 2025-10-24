import React from "react";
import { Link } from "react-router-dom";
import "./SuccessPage.css";

export function SuccessPage() {
  return (
    <div className="success-container">
      <div className="success-box">
        <h2>Payment Successful 🎉</h2>
        <p>
          Thank you for your order! Your payment has been processed
          successfully.
        </p>
        <div className="success-buttons">
          <Link to="/" className="proceed-btn">
            Go to Home
          </Link>
          <Link
            to="/orders"
            className="orders-btn"
            state={{ highlightLatest: true }}
          >
            Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
