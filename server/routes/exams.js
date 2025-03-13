const express = require('express');
const Exam = require('../models/Exam');
const router = express.Router();

// Get all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new exam
router.post('/', async (req, res) => {
  const exam = new Exam(req.body);
  try {
    const newExam = await exam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;