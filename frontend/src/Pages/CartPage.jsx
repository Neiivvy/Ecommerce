import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export function CartPage() {
  const { cart, setCart, user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleRemove = (id) => {
    const removedItem = cart.find((item) => item.id === id);
    setCart(cart.filter((item) => item.id !== id));
    showToast(`${removedItem.name} removed from cart`, "error");
  };

  const handlePlaceOrder = (id) => {
    const orderedItem = cart.find((item) => item.id === id);
    showToast(`Order placed for ${orderedItem.name}`, "success");
    setCart(cart.filter((item) => item.id !== id));
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
                    onClick={() => handlePlaceOrder(product.id)}
                  >
                    Place Order
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
