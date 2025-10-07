const Cart = require('../models/cartModel');

const addToCart = (req, res) => {
  Cart.addItem(req.body, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Item added to cart', cartId: results.insertId });
  });
};

const getCart = (req, res) => {
  const userId = req.params.userId;
  Cart.getCartByUser(userId, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const removeFromCart = (req, res) => {
  Cart.removeItem(req.params.cartId, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Item removed from cart' });
  });
};

module.exports = { addToCart, getCart, removeFromCart };
