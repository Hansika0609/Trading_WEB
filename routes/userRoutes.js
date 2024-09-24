const express = require('express');
const router = express.Router();
const { sendOTP, verifyOtp } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticate');

// Route for sending OTP
router.post('/send-otp', sendOTP);

// Route for verifying OTP (Login)
router.post('/verify-otp', verifyOtp);

// Protected route (Example)
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;
