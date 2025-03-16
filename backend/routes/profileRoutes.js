const express = require("express");
const db = require("../db");

const router = express.Router();

// ✅ Get user details by ID
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  console.log("🟢 Fetching user details for ID:", userId);

  const query = "SELECT id, first_name, last_name, gender, email, phone, address FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      console.warn("⚠️ User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("✅ User data found:", result[0]);
    res.json(result[0]);
  });
});

// ✅ Update user details
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, gender, phone, address } = req.body;

  const query = "UPDATE users SET first_name = ?, last_name = ?, gender = ?, phone = ?, address = ? WHERE id = ?";
  db.query(query, [first_name, last_name, gender, phone, address, userId], (err, result) => {
    if (err) {
      console.error("❌ Error updating profile:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found or no changes made" });
    }
    res.json({ message: "Profile updated successfully" });
  });
});

module.exports = router;
