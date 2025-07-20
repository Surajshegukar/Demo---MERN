const express = require("express");
const router = express.Router();
const { loginUser, registerUser, refreshToken, fetchSession, logoutUser } = require("../controllers/authController");
const {
  userValidationRules,
  validateRequest,
} = require("../validations/validations");
const e = require("express");

router.post("/register", userValidationRules, validateRequest, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", fetchSession);
router.get("/refresh", refreshToken);

module.exports = router;
