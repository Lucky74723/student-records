const express = require('express');
const Alumni = require('../models/Alumni');
const router = express.Router();

// Get all alumni
router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new alumni record
router.post('/', async (req, res) => {
  const alumni = new Alumni(req.body);
  try {
    const newAlumni = await alumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an alumni record
router.delete('/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;