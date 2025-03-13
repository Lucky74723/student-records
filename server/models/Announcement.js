const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  text: String,
  timestamp: Date,
});

module.exports = mongoose.model('Announcement', announcementSchema);