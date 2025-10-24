import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./OrdersPage.css";

export function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p className="not-logged-in">Please log in to view your orders.</p>;
  if (loading) return <p className="loading">Loading orders...</p>;
  if (orders.length === 0) return <p className="no-orders">You have no orders yet.</p>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
            </div>
            <div className="order-body">
              <img
                src={order.image ? `http://localhost:5000${order.image}` : "https://via.placeholder.com/100"}
                alt={order.name}
                className="order-image"
              />
              <div className="order-details">
                <p><strong>Product:</strong> {order.name}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Product Price:</strong> ₹{order.price}</p>
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
