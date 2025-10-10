// src/Pages/CheckoutPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";

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
  const total = product ? product.price + deliveryFee : 0;

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
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "https://via.placeholder.com/100"
              }
              alt={product.name}
            />
            <div>
              <p>{product.name}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          </div>

          <div className="summary-details">
            <p>Delivery Fee: ₹{deliveryFee}</p>
            <h4>Total: ₹{total}</h4>
          </div>

          <button
            className="proceed-btn"
            disabled={!allFilled}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}
