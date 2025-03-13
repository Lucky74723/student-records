const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: String, required: true },
  grade: { type: String, required: true },
});

module.exports = mongoose.model('Grade', GradeSchema);