const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: Date,
});

module.exports = mongoose.model('Message', messageSchema);