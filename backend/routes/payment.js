const express = require("express");
const router = express.Router();
const { createPayment, getPayment } = require("../controllers/paymentController");

// Record a payment
router.post("/", createPayment);

// Get payment for an order
router.get("/:orderId", getPayment);

module.exports = router;
