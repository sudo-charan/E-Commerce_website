const express = require("express");
const db = require("../config/db"); // Import database connection
const router = express.Router();

// ✅ Fetch User Details
router.get("/:id", (req, res) => {
    const id = req.params.id;

    // 🔹 Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    console.log("🟢 Fetching user with ID:", id); // Debugging

    const query = "SELECT id, first_name, last_name, gender, email, phone, address FROM users WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("❌ DB Error:", err);
            return res.status(500).json({ error: "Database error", details: err });
        }
        if (result.length === 0) {
            console.warn("⚠️ User not found:", id);
            return res.status(404).json({ error: "User not found" });
        }
        console.log("✅ User found:", result[0]);
        res.json(result[0]);
    });
});

// ✅ Update User Data (PUT Request)
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, gender, phone, address } = req.body;

    // 🔹 Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // 🔹 Validate required fields
    if (!first_name || !last_name || !gender || !phone || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log("🔄 Updating user:", { id, first_name, last_name, gender, phone, address });

    const query = "UPDATE users SET first_name = ?, last_name = ?, gender = ?, phone = ?, address = ? WHERE id = ?";
    db.query(query, [first_name, last_name, gender, phone, address, id], (err, result) => {
        if (err) {
            console.error("❌ Error updating profile:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }
        console.log("✅ Profile updated successfully:", { id });
        res.json({ message: "Profile updated successfully" });
    });
});

module.exports = router;
