const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { signUp, login, getMe } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

module.exports = router;
