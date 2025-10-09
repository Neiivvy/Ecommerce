const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // your db connection
require("dotenv").config();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: err });

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: err });

        // Generate JWT without expiration
        const token = jwt.sign(
          { id: result.insertId, name, email },
          process.env.JWT_SECRET
        );

        return res.status(201).json({
          message: "User created",
          token,
          user: { id: result.insertId, name, email }
        });
      }
    );
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: err });

    if (result.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT without expiration
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

module.exports = router;
