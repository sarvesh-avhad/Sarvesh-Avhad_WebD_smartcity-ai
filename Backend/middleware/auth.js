const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization token provided, access denied' });
    }

    // Expecting format "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token format is invalid' });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid or expired' });
    }
};

module.exports = authMiddleware;
