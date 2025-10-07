
const Product = require('../models/productModel');

const getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const getProductById = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

module.exports = { getAllProducts, getProductById };
