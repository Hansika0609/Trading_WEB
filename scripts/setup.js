const connectDB = require('../config/db');

const initializeDB = async () => {
  const connection = await connectDB();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(15) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      otp VARCHAR(6),
      verified BOOLEAN DEFAULT FALSE
    )
  `;
  await connection.query(createTableQuery);
  console.log('Users table created or already exists.');

  connection.end();
};

initializeDB().catch(err => {
  console.error('Error initializing database:', err);
});
