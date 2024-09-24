const mysql = require('../config/db'); // Assuming you have a MySQL connection setup

// Function to create a trainer
const createTrainer = async (trainerData) => {
  const { name, specialization, experience, language, certification, rating, chargesChat, chargesYoutube, approved_by_admin } = trainerData;

  const query = `
    INSERT INTO trainers (Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const connection = await mysql();
    const [result] = await connection.query(query, [
      name, 
      specialization, 
      experience, 
      language, 
      certification, 
      rating, 
      chargesChat, 
      chargesYoutube,
      approved_by_admin || false // Default to 'false' if not provided
    ]);
    return result.insertId;
  } catch (error) {
    console.error('Error creating trainer:', error);
    throw error;
  }
};


// Function to get all trainers
const getAllTrainers = async () => {
  const query = `SELECT * FROM trainers`;

  try {
    const connection = await mysql();
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};

// Function to get a trainer by ID
const getTrainerById = async (trainerId) => {
  const query = `SELECT * FROM trainers WHERE Trainer_id = ?`;

  try {
    const connection = await mysql();
    const [rows] = await connection.query(query, [trainerId]);
    return rows[0]; // Return the first trainer found
  } catch (error) {
    console.error('Error fetching trainer by ID:', error);
    throw error;
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  getTrainerById
};
