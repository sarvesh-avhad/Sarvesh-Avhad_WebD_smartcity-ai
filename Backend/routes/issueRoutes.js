const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const issueController = require('../controllers/issueController');

// Define REST routes protected by JWT
router.post('/', auth, issueController.createIssue);
router.get('/dashboard', auth, issueController.getDashboardStats);
router.get('/nearby', auth, issueController.getNearbyIssues);
router.get('/my-reports', auth, issueController.getMyReports);
router.put('/:id/upvote', auth, issueController.toggleUpvote);
router.post('/:id/feedback', auth, issueController.addFeedback);

// Admin Routes
router.get('/admin/all', auth, isAdmin, issueController.getAllIssuesAdmin);
router.put('/admin/:id/status', auth, isAdmin, issueController.updateIssueStatus);

module.exports = router;
