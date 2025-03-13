const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  course: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['mid-term', 'final', 'quiz'], required: true },
});

module.exports = mongoose.model('Exam', ExamSchema);