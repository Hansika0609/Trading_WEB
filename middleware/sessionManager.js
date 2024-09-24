let userSessions = {};

const sessionManager = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const now = Date.now();

  if (token) {
    if (userSessions[token]) {
      const { lastActive } = userSessions[token];
      
      // Check if session is expired (1 hour inactivity)
      if (now - lastActive > 3600000) { // 1 hour
        delete userSessions[token];
        return res.status(401).json({ message: 'Session expired due to inactivity.' });
      } else {
        userSessions[token].lastActive = now; // Update last activity
      }
    }
  }

  next();
};

module.exports = sessionManager;
