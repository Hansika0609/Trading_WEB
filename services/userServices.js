const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const otpGenerator = require('../utils/otp');
const { hashPassword } = require('../utils/hash');
const validatePhoneNumber = require('../utils/validatePhoneNumber');

const sendOtp = async (name, phone) => {
  const formattedPhone = validatePhoneNumber(phone); // Ensure phone is in E.164 format
  if (!formattedPhone) {
    throw new Error('Invalid phone number format.');
  }

  const otp = otpGenerator.generateOtp();
  const sqlInsert = `
    INSERT INTO users (name, phone, otp) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE otp = ?;
  `;
  const values = [name, formattedPhone, otp, otp];

  const conn = await connection();
  await conn.query(sqlInsert, values);

  otpGenerator.sendOTP(formattedPhone, otp); // Send OTP using Twilio
  return otp;
};

const verifyOtp = async (phone, otp) => {
    const sqlSelect = `SELECT otp FROM users WHERE phone = ?`;
    const conn = await connection();
    const [rows] = await conn.query(sqlSelect, [phone]);
  
    if (rows.length === 0) {
      throw new Error('User not found.');
    }
  
    if (rows[0].otp !== otp) {
      throw new Error('Invalid OTP.');
    }
  
    // Generate JWT
    const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign({ phone }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
    // Update the user with the JWT tokens
    const sqlUpdate = `UPDATE users SET verified = 1, token = ?, refresh_token = ? WHERE phone = ?`;
    await conn.query(sqlUpdate, [token, refreshToken, phone]);
  
    return { token, refreshToken };
  };
  

module.exports = { sendOtp, verifyOtp };
