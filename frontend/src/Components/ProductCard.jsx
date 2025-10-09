import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/150";

  const { user } = useContext(AuthContext); // get logged-in user
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      // Not logged in → redirect to login page
      navigate("/login");
      return;
    }

    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <div className="product-card">
      <img src={imageSrc} alt={product.name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <p className="product-rating">
          Rating: {product.rating ? product.rating : "N/A"} ⭐⭐⭐⭐
        </p>
        <p className="product-stock">
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
