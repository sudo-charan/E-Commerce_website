const express = require("express");
const db = require("../config/db");
const router = express.Router();

// ✅ Fetch User Profile
router.get("/:id", (req, res) => {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const sql = "SELECT id, first_name, last_name, gender, email, phone, address FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result[0]); // Send user data as response
    });
});

// ✅ Update User Profile
router.put("/:id", (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, gender, phone, address } = req.body;

    if (!first_name || !last_name || !gender || !phone || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "UPDATE users SET first_name=?, last_name=?, gender=?, phone=?, address=? WHERE id=?";
    db.query(sql, [first_name, last_name, gender, phone, address, userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Profile updated successfully" });
    });
});

module.exports = router;
