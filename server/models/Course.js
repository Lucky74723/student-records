const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  credits: { type: Number, required: true },
  prerequisites: { type: String },
});

module.exports = mongoose.model('Course', CourseSchema);