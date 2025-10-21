// ✅ Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve images
app.use("/images/products", express.static("public/images/products"));
app.use("/images/ratings", express.static("public/images/ratings"));

// ✅ Import routes
const productRoutes = require("./routes/product");
app.use("/products", productRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes);

const paymentRoutes = require("./routes/payment");
app.use("/api/payments", paymentRoutes);

const orderRoutes = require("./routes/order");
app.use("/orders", orderRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
