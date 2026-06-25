const express = require("express");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");

const router = express.Router();

console.log(registerUser);
console.log(loginUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;