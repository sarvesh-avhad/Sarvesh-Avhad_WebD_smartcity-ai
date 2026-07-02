const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

// @route   GET /api/users/profile
router.get('/profile', authMiddleware, getProfile);

// @route   PUT /api/users/profile
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
