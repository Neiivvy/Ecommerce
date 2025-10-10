// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

// Add item to cart
router.post("/", addToCart);

// Get cart by user
router.get("/:userId", getCart);

// Remove item from cart
router.delete("/:cartId", removeFromCart);

module.exports = router;
