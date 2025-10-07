const Order = require('../models/orderModel');

const createOrder = (req, res) => {
  Order.create(req.body, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Order created', orderId: results.insertId });
  });
};

const getOrders = (req, res) => {
  Order.getOrdersByUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

module.exports = { createOrder, getOrders };
