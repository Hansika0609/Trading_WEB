const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = (phone, otp) => {
  client.messages.create({
    body: `Your OTP for verification is: ${otp}`,
    from: twilioPhoneNumber,
    to: phone
  })
  .then(message => console.log(`OTP sent: ${message.sid}`))
  .catch(err => console.error('Error sending OTP:', err));
};
