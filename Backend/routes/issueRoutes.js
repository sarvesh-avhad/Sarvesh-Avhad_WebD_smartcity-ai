const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const issueController = require('../controllers/issueController');
<<<<<<< HEAD
const { upload } = require('../config/cloudinary');

// Define REST routes protected by JWT
router.post('/', auth, upload.single('image'), issueController.createIssue);
=======

// Define REST routes protected by JWT
router.post('/', auth, issueController.createIssue);
>>>>>>> 603d14ae9636dbd9f8b5c542feca509374fce50f
router.get('/dashboard', auth, issueController.getDashboardStats);
router.get('/nearby', auth, issueController.getNearbyIssues);
router.get('/my-reports', auth, issueController.getMyReports);
router.put('/:id/upvote', auth, issueController.toggleUpvote);
router.post('/:id/feedback', auth, issueController.addFeedback);

// Admin Routes
router.get('/admin/all', auth, isAdmin, issueController.getAllIssuesAdmin);
router.put('/admin/:id/status', auth, isAdmin, issueController.updateIssueStatus);

module.exports = router;
