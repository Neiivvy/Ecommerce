// routes/order.js
const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");

// Create order
router.post("/", createOrder);

// Get orders for a user
router.get("/:userId", getOrders);

module.exports = router;
