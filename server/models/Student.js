const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  contact: { type: String, required: true },
  grade: { type: String, required: true },
  attendance: [{ type: String }],
  fees: [{
    amount: { type: Number, required: true },
    method: { type: String, required: true },
  }],
});

module.exports = mongoose.model('Student', StudentSchema);