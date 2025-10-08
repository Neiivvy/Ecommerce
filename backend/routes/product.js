const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure you export your MySQL connection from db.js

// GET all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
