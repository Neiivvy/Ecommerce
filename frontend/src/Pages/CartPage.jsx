// src/Pages/CartPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function CartPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to see your cart.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{user.name}'s Cart</h1>
      <p>This is where items added to your cart will appear.</p>

      {/* Example placeholder */}
      <div style={{ marginTop: "1rem" }}>
        <p>No items yet. Add products from the homepage.</p>
      </div>

      <Link to="/orders">
        <button style={{ marginTop: "1rem" }}>Go to Orders</button>
      </Link>
    </div>
  );
}
