const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all announcements
router.get('/', async (req, res) => {
  const announcements = await Announcement.find();
  res.json(announcements);
});

// Add a new announcement
router.post('/', async (req, res) => {
  const newAnnouncement = new Announcement(req.body);
  await newAnnouncement.save();
  res.json(newAnnouncement);
});

// ...add other CRUD operations as needed

module.exports = router;