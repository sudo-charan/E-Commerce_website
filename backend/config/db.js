const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nittekart", // ✅ Use correct database name
  waitForConnections: true,
  connectionLimit: 10, // Allow up to 10 connections
  queueLimit: 0,
});

// Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  } else {
    console.log("✅ MySQL Connected!");
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = db;
