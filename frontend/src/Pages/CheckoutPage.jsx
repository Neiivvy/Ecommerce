// src/Pages/CheckoutPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";
import axios from "axios";


export function CheckoutPage() {
  const { state } = useLocation();
  const product = state?.product;

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    region: "",
    city: "",
    address: "",
    area: "",
  });

  const allFilled = Object.values(formData).every((value) => value.trim() !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deliveryFee = 150;
  const total = product ? (+product.price + deliveryFee).toFixed(2) : "0.00";

  // ✅ Optional: keep a named function for clarity
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
        product: product,
        totalAmount: Number(total),
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe checkout
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Delivery Information</h2>
        <form>
          <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input type="text" name="area" placeholder="Area / Nearby Landmark" value={formData.area} onChange={handleChange} />
          <button type="button" className="save-btn" disabled={!allFilled}>
            Save & Continue
          </button>
        </form>
      </div>

      {product && (
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <img
              src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/100"}
              alt={product.name}
            />
            <div className="summary-info">
              <p className="summary-name">{product.name}</p>
              <p className="summary-price">Price: ₹{(+product.price).toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-details">
            <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
            <h4>Total: ₹{total}</h4>
          </div>

          <button
            className="proceed-btn"
            disabled={!allFilled}
            onClick={handlePayment} // ✅ use the named function
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}
