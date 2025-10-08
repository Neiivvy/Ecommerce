const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve images
app.use("/images/products", express.static("public/images/products"));
app.use("/images/ratings", express.static("public/images/ratings"));

// Import product routes
const productRoutes = require("./routes/product");
app.use("/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
