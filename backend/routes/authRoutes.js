const exporess = require('express');
const router = exporess.Router();
const { loginUser , registerUser } = require('../controllers/authController');
const { userValidationRules, validateRequest } = require('../validations/validations');

router.post("/register",userValidationRules , validateRequest, registerUser);
router.post("/login", loginUser);

module.exports = router;