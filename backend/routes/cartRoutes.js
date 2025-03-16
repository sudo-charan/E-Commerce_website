const express = require("express");
const { getCartItems, addToCart } = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", addToCart);

module.exports = router;
