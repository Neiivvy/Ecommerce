import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, cart, setCart } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/150";

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
      showToast(`${product.name} added to cart!`, "success");
    } else {
      showToast(`${product.name} is already in cart!`, "info");
    }
  };

  const inCart = cart.some((item) => item.id === product.id);

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
          disabled={product.stock === 0 || inCart}
        >
          {inCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
