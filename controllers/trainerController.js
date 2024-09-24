const trainerService = require('../services/trainerService');
const logger = require('../utils/logger');

// Create a new trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await trainerService.createTrainer(req.body);
    logger.info(`Trainer created: ${trainer.Name}`);
    res.status(201).json({ success: true, trainer });
  } catch (error) {
    logger.error(`Error creating trainer: ${error.message}`);
    res.status(500).json({ success: false, message: 'Failed to create trainer', error: error.message });
  }
};

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await trainerService.getAllTrainers();
    res.status(200).json({ success: true, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trainers', error: error.message });
  }
};

// Get a trainer by ID
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await trainerService.getTrainerById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trainer', error: error.message });
  }
};

// Update trainer
exports.updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await trainerService.updateTrainer(req.params.id, req.body);
    if (!updatedTrainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, trainer: updatedTrainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update trainer', error: error.message });
  }
};

// Delete trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await trainerService.deleteTrainer(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete trainer', error: error.message });
  }
};
