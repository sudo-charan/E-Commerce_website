const express = require("express");
const { register, login, logout, checkAuthStatus } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/status", checkAuthStatus);

module.exports = router;
