// src/Pages/OrdersPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function OrdersPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to see your orders.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{user.name}'s Orders Page</h1>
      <p>Here you will see your cart items and previous orders.</p>

      <Link to="/checkout">
        <button style={{ marginTop: "1rem" }}>Go to Checkout</button>
      </Link>
    </div>
  );
}
