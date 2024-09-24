const validatePhoneNumber = (phone) => {
    // Assuming the user gives the number without country code, add default country code (e.g., India +91)
    if (!phone.startsWith('+')) {
      phone = `+91${phone}`; // Adjust for your country or make this dynamic
    }
    
    const phoneRegex = /^\+\d{10,15}$/; // E.164 format, adjust based on your needs
    return phoneRegex.test(phone) ? phone : null;
  };
  
  module.exports = validatePhoneNumber;
  