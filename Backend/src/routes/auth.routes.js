// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register, verifyOTP, forgetPassword, resetPassword, changePassword } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/jwt.service');


router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
