const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('student');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new attendance record
router.post('/', async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;