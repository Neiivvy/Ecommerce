require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware for normal routes
app.use(cors());

// ✅ Serve images
app.use("/images/products", express.static("public/images/products"));
app.use("/images/ratings", express.static("public/images/ratings"));

// ✅ Stripe webhook must come BEFORE express.json()
const paymentRoutes = require("./routes/payment");
// This raw middleware ONLY applies to the webhook route
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// ✅ Normal JSON parsing for all other routes
app.use(express.json());

// ✅ Import normal routes
const productRoutes = require("./routes/product");
app.use("/products", productRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes);

// Payment & Order routes (excluding webhook)
app.use("/api/payments", paymentRoutes);

const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
