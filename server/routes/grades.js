const express = require('express');
const Grade = require('../models/Grade');
const router = express.Router();

// Get all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find().populate('student');
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new grade
router.post('/', async (req, res) => {
  const grade = new Grade(req.body);
  try {
    const newGrade = await grade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a grade
router.delete('/:id', async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;