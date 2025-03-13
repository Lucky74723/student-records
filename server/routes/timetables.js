const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get all timetables
router.get('/', async (req, res) => {
  const timetables = await Timetable.find();
  res.json(timetables);
});

// Add a new timetable
router.post('/', async (req, res) => {
  const newTimetable = new Timetable(req.body);
  await newTimetable.save();
  res.json(newTimetable);
});

// ...add other CRUD operations as needed

module.exports = router;