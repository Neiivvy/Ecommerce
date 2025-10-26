const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { totalAmount, userId, productId, productName, quantity } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: quantity || 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failure`,
      metadata: {
        userId,
        productId,
        quantity,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    res.status(500).json({ error: "Payment session failed" });
  }
});

// Stripe Webhook - must use raw body for signature verification
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata;

      const userId = metadata.userId;       // ✅ define userId
      const productId = metadata.productId; // ✅ define productId
      const quantity = metadata.quantity;

      // 1️⃣ Create Order
      Order.create(
        {
          userId,
          productId,
          quantity,
          totalPrice: session.amount_total / 100,
          paymentMethod: session.payment_method_types[0],
          status: "Paid",
        },
        (err, orderResult) => {
          if (err) {
            console.error("Order creation failed:", err);
            return res.status(500).send("Order creation failed");
          }

          const orderId = orderResult.insertId;

          // 2️⃣ Remove item from cart
          Cart.getCartByUser(userId, (err2, cartItems) => {
            if (err2) {
              console.error("Failed to fetch cart:", err2);
            } else if (cartItems) {
              const cartItem = cartItems.find((c) => c.productId == productId);
              if (cartItem) {
                Cart.removeItem(cartItem.id, (err3) => {
                  if (err3) console.error("Cart removal failed:", err3);
                  else console.log("Cart item removed after payment");
                });
              }
            }
          });

          // 3️⃣ Create Payment linked to the order
          Payment.create(
            {
              orderId,
              amount: session.amount_total / 100,
              paymentMethod: session.payment_method_types[0],
              status: "Paid",
              transactionId: session.payment_intent,
            },
            (err2) => {
              if (err2) {
                console.error("Payment recording failed:", err2);
                return res.status(500).send("Payment recording failed");
              }

              console.log("Order & Payment recorded successfully");
              res.status(200).send("Webhook processed");
            }
          );
        }
      );
    } else {
      res.status(200).send("Event ignored");
    }
  }
);

module.exports = router;
