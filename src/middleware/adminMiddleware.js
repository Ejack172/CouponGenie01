const adminMiddleware = (req, res, next) => {
    // DEV PURPOSES ONLY: Allow bypassing for local SSR preview
    if (req.headers['x-dev-mock-admin'] === 'true') {
        req.user = { id: 1, role: 'ADMIN' };
        return next();
    }

    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
};

module.exports = adminMiddleware;
