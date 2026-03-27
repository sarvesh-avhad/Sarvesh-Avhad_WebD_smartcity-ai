const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied: Admin credentials required' });
        }
    } catch (err) {
        console.error('isAdmin middleware error:', err.message);
        res.status(500).json({ error: 'Server error verifying role' });
    }
};

module.exports = isAdmin;
