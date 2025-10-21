// routes/payment.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Stripe Checkout Session (Frontend will call this)
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { product, totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", // Stripe test uses USD (works globally in test mode)
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(totalAmount * 100), // Stripe accepts cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failure`,
    });

    res.json({ url: session.url }); // ✅ Send URL to frontend to redirect
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment session failed" });
  }
});

module.exports = router;
