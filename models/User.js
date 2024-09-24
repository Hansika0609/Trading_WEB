const db = require('../config/db');

const User = {
  create: async (name, phone, password) => {
    const query = `INSERT INTO users (name, phone, password) VALUES (?, ?, ?)`;
    const connection = await db();
    await connection.query(query, [name, phone, password]);
    connection.end();
  },
  findByPhone: async (phone) => {
    const query = `SELECT * FROM users WHERE phone = ?`;
    const connection = await db();
    const [rows] = await connection.query(query, [phone]);
    connection.end();
    return rows[0];
  },
};

module.exports = User;
