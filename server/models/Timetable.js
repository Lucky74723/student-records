const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  course: String,
  day: String,
  time: String,
  room: String,
  teacher: String,
});

module.exports = mongoose.model('Timetable', timetableSchema);