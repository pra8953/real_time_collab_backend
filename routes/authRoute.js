const router = require('express').Router();

const { login, signup } = require('./../controllers/auth/authController');
const { loginValidation, signupValidation } = require('./../Validators/authValidation');

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

module.exports = router