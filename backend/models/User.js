const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    const { firstName, lastName, gender, email, phone, password } = userData;

    // Check if email or phone already exists before inserting
    const checkSql = "SELECT id FROM users WHERE email = ? OR phone = ?";
    db.query(checkSql, [email, phone], (err, results) => {
      if (err) return callback(err, null); // Database error

      if (results.length > 0) {
        return callback({ error: "User with this email or phone already exists" }, null);
      }

      // Insert new user without hashing password
      const insertSql = "INSERT INTO users (first_name, last_name, gender, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(insertSql, [firstName, lastName, gender, email, phone, password], (insertErr, insertResults) => {
        if (insertErr) return callback(insertErr, null);
        callback(null, { message: "User registered successfully", id: insertResults.insertId });
      });
    });
  },

  findByEmailOrPhone: (emailOrPhone, callback) => {
    const sql = "SELECT * FROM users WHERE email = ? OR phone = ?";
    db.query(sql, [emailOrPhone, emailOrPhone], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
};

module.exports = User;
