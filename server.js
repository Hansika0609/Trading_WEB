const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const sessionManager = require('./middleware/sessionManager');
const logger = require('./utils/logger');
const cors = require('cors'); // Allow cross-origin requests
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(sessionManager); // Middleware for session management

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/trainers', trainerRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
});
