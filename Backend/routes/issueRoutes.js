const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const issueController = require('../controllers/issueController');

// Define REST routes protected by JWT
router.post('/', auth, issueController.createIssue);
router.get('/my-reports', auth, issueController.getMyReports);

module.exports = router;
