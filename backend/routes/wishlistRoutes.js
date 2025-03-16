const express = require("express");
const { getWishlistItems, addToWishlist } = require("../controllers/wishlistController");

const router = express.Router();

router.get("/", getWishlistItems);
router.post("/add", addToWishlist);

module.exports = router;
