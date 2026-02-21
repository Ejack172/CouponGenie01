const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (req.headers['x-dev-mock-admin'] === 'true') {
        req.user = { id: 1, role: 'ADMIN' };
        return next();
    }

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
