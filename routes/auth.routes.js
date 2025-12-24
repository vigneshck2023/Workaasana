const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/project.model");

const router = express.Router();

/* LOGIN */
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  let user = await User.findOne({ name });

  // Auto-create user (for now)
  if (!user) {
    user = await User.create({ name, password });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role || "user",
    },
  });
});

/* GUEST LOGIN */
router.post("/guest", (req, res) => {
  const token = jwt.sign(
    { name: "Guest User", role: "guest" },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  res.json({
    token,
    user: {
      name: "Guest User",
      role: "guest",
    },
  });
});

module.exports = router;
