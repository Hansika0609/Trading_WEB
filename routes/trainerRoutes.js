const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate');
const { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer } = require('../controllers/trainerController');

// CRUD routes for trainers (protected by JWT authentication)
router.post('/', authenticateJWT, createTrainer);
router.get('/', authenticateJWT, getAllTrainers);
router.get('/:id', authenticateJWT, getTrainerById);
router.put('/:id', authenticateJWT, updateTrainer);
router.delete('/:id', authenticateJWT, deleteTrainer);

module.exports = router;
