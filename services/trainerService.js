const connection = require('../config/db');

const createTrainer = async (data) => {
  const { Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin } = data;
  
  const sql = `
    INSERT INTO trainers (Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin || false];

  const conn = await connection();
  const [result] = await conn.query(sql, values);
  return { Trainer_id: result.insertId, ...data };
};


const getAllTrainers = async () => {
  const sql = 'SELECT * FROM trainers';
  const conn = await connection();
  const [trainers] = await conn.query(sql);
  return trainers;
};

const getTrainerById = async (id) => {
  const sql = 'SELECT * FROM trainers WHERE Trainer_id = ?';
  const conn = await connection();
  const [trainers] = await conn.query(sql, [id]);
  return trainers[0];
};

const updateTrainer = async (id, data) => {
  const { Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin } = data;

  const sql = `
    UPDATE trainers SET Name = ?, Specialization = ?, Experience = ?, Language = ?, Certification = ?, Rating = ?, Charges_Chat = ?, Charges_Youtube = ?, approved_by_admin = ?
    WHERE Trainer_id = ?
  `;
  const values = [Name, Specialization, Experience, Language, Certification, Rating, Charges_Chat, Charges_Youtube, approved_by_admin, id];

  const conn = await connection();
  const [result] = await conn.query(sql, values);
  return result.affectedRows ? { Trainer_id: id, ...data } : null;
};


const deleteTrainer = async (id) => {
  const sql = 'DELETE FROM trainers WHERE Trainer_id = ?';
  const conn = await connection();
  const [result] = await conn.query(sql, [id]);
  return result.affectedRows;
};

module.exports = {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
