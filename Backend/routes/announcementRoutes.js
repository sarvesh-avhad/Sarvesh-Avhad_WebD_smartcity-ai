const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const announcementController = require('../controllers/announcementController');

// All citizens can read announcements
router.get('/', auth, announcementController.getAnnouncements);

// Only admins can create announcements
router.post('/', auth, isAdmin, announcementController.createAnnouncement);

module.exports = router;
