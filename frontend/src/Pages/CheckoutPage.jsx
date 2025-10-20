// src/Pages/CheckoutPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";

export function CheckoutPage() {
  const { state } = useLocation();
  const product = state?.product;

  const regions = [
    "Bagmati", "Gandaki", "Lumbini", "Koshi", "Madhesh", "Sudurpashchim", "Karnali"
  ];

  const citiesByRegion = {
    Bagmati: ["Kathmandu", "Lalitpur", "Bhaktapur", "Dhading"],
    Gandaki: ["Pokhara", "Gorkha", "Lamjung"],
    Lumbini: ["Butwal", "Bardiya", "Kapilvastu"],
    Koshi: ["Biratnagar", "Sunsari", "Morang"],
    Madhesh: ["Janakpur", "Birgunj", "Mahottari"],
    Sudurpashchim: ["Dhangadhi", "Kailali", "Dadeldhura"],
    Karnali: ["Jumla", "Surkhet", "Dailekh"]
  };

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { city: "" } : {}) // reset city when region changes
    }));
  };

  const deliveryFee = 150;
  const total = product ? (+product.price + deliveryFee).toFixed(2) : "0.00";

  // Check if name + phone are filled to enable region
  const enableRegion = formData.fullname.trim() && formData.phone.trim();

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Delivery Information</h2>
        <form>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Region Input with Datalist */}
          <input
            list="regions"
            name="region"
            value={formData.region}
            onChange={handleChange}
            disabled={!enableRegion}
            className={!enableRegion ? "disabled" : ""}
            placeholder="Select or type Region"
          />
          <datalist id="regions">
            {regions.map((region) => (
              <option key={region} value={region} />
            ))}
          </datalist>

          {/* City Input with Datalist */}
          <input
            list="cities"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.region}
            className={!formData.region ? "disabled" : ""}
            placeholder="Select or type City"
          />
          <datalist id="cities">
            {formData.region &&
              citiesByRegion[formData.region].map((city) => (
                <option key={city} value={city} />
              ))}
          </datalist>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="area"
            placeholder="Area / Nearby Landmark"
            value={formData.area}
            onChange={handleChange}
          />

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

          <button className="proceed-btn" disabled={!allFilled}>
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}
