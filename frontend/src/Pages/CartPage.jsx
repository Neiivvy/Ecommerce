import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

import "./CartPage.css";

export function CartPage() {
  const { cart, user, removeFromCart } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // Remove item from cart (state + DB handled inside context)
  const handleRemove = async (productId) => {
    // Find item name before removing for toast
    const removedItem = cart.find((item) => item.id === productId);
    await removeFromCart(productId);
    if (removedItem) showToast(`${removedItem.name} removed from cart`, "error");
  };

  // Place order: navigate to checkout page with cart item info
  const handlePlaceOrder = (product) => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">{user.name}'s Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. Go to homepage and click “Add to Cart” on your preferred product.
        </p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={
                  product.image
                    ? `http://localhost:5000${product.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p className="price-tag">₹{product.price}</p>
                <div className="cart-item-buttons">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="order-btn"
                    onClick={() => handlePlaceOrder(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
