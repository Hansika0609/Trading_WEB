const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL database connected');
    
    await createTables(connection); // Automatically create tables
    return connection; // Return the connection
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
};

const createTables = async (connection) => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) UNIQUE NOT NULL,
      otp VARCHAR(6),
      verified TINYINT DEFAULT 0,
      token VARCHAR(512),
      refresh_token VARCHAR(512),
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  
  const createTrainersTable = `
    CREATE TABLE IF NOT EXISTS trainers (
      Trainer_id INT AUTO_INCREMENT PRIMARY KEY,
      Name VARCHAR(100) NOT NULL,
      Specialization VARCHAR(100),
      Experience INT,
      Language VARCHAR(100),
      Certification VARCHAR(255),
      Rating FLOAT,
      Charges_Chat DECIMAL(10, 2),
      Charges_Youtube DECIMAL(10, 2),
      approved_by_admin BOOLEAN DEFAULT false
    );
  `;

  await connection.query(createUsersTable);
  await connection.query(createTrainersTable);
  console.log('Tables created successfully');
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
