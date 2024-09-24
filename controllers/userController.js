const userService = require('../services/userServices');

// Controller to send OTP
exports.sendOTP = async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
    }

    try {
        const otp = await userService.sendOtp(name, phone); // Send OTP and store in DB
        res.status(200).json({ success: true, message: 'OTP sent successfully', otp });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending OTP', error: error.message });
    }
};

// Controller to verify OTP and issue JWT
exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: 'Phone number and OTP are required.' });
    }

    try {
        const { token, refreshToken } = await userService.verifyOtp(phone, otp);
        res.status(200).json({ success: true, message: 'Login successful.', token, refreshToken });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
