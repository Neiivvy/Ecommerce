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

  const [loading, setLoading] = useState(false);
  const allFilled = Object.values(formData).every((value) => value.trim() !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deliveryFee = 150;
  const total = product ? (Number(product.price) + deliveryFee).toFixed(2) : "0.00";

 const handlePayment = async () => {
  if (!product || !allFilled || loading) return;

  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/payments/create-checkout-session",
      {
        totalAmount: Number(total),
        userId: "2",                   // ✅ hardcoded user ID for testing
        productId: product.id || "1",  // ✅ send actual product ID, fallback to 1
        productName: product.name || "Product", // ✅ for Stripe display
        quantity: 1,                   // ✅ default quantity
      }
    );

    if (response.data.url) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error("Payment failed", error);
    setLoading(false);
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
              <p className="summary-price">Price: ₹{Number(product.price).toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-details">
            <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
            <h4>Total: ₹{total}</h4>
          </div>

          <button
            className="proceed-btn"
            disabled={!allFilled || loading}
            onClick={handlePayment}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      )}
    </div>
  );
}