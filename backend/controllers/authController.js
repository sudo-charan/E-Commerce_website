const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nittekart"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// 🚀 Register User with JWT Token
const register = (req, res) => {
    const { firstName, lastName, gender, email, phone, password } = req.body;

    if (!firstName || !lastName || !gender || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // 🔹 Check if email or phone already exists
    const checkQuery = "SELECT * FROM users WHERE email = ? OR phone = ?";
    db.query(checkQuery, [email, phone], (err, results) => {
        if (err) {
            console.error("❌ MySQL Query Error:", err);
            return res.status(500).json({ success: false, message: "Database error!" });
        }

        if (results.length > 0) {
            return res.status(409).json({ success: false, message: "Email or phone number already exists!" });
        }

        // 🔹 Insert the new user
        const insertQuery = "INSERT INTO users (first_name, last_name, gender, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [firstName, lastName, gender, email, phone, password], (err, result) => {
            if (err) {
                console.error("❌ MySQL Insert Error:", err);
                return res.status(500).json({ success: false, message: "Registration failed!" });
            }

            const token = jwt.sign({ userId: result.insertId, email }, "nitte", { expiresIn: "1h" });

            res.status(201).json({
                success: true,
                message: "Signup successful!",
                token,
                username: `${firstName} ${lastName}`  // ✅ Send Full Name
            });
        });
    });
};

// 🚀 Login User with JWT Token
const login = (req, res) => {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(400).json({ success: false, message: "Email/Phone and Password are required!" });
    }

    const sql = "SELECT id, first_name, email FROM users WHERE (email = ? OR phone = ?) AND password = ?";
    db.query(sql, [emailOrPhone, emailOrPhone, password], (err, results) => {
        if (err) {
            console.error("MySQL Query Error:", err);
            return res.status(500).json({ success: false, message: "Database error!" });
        }
        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ userId: user.id, email: user.email }, "nitte", { expiresIn: "1h" });

            return res.json({ 
                success: true, 
                message: "Login successful!", 
                token, 
                username: user.first_name  // ✅ Send the first name
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }
    });
};

// 🚀 Check if User is Authenticated
const checkAuthStatus = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided!" });
    }

    jwt.verify(token, "nitte", (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token!" });
        }
        res.json({ success: true, message: "User is authenticated", userId: decoded.userId });
    });
};

// 🚀 Logout (Clears Frontend Token)
const logout = (req, res) => {
    return res.json({ success: true, message: "Logged out successfully!" });
};

module.exports = { register, login, logout, checkAuthStatus };
