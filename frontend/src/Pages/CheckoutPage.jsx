// src/Pages/CheckoutPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function CheckoutPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to proceed to checkout.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout Page</h1>
      <p>This is where {user.name} will see the items ready to purchase.</p>
    </div>
  );
}
