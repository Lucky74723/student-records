const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  contact: { type: String, required: true },
  job: { type: String, required: true },
});

module.exports = mongoose.model('Alumni', AlumniSchema);