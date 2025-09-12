const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token;

    // Check if token is in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object (you can access user info like req.user)
            req.user = decoded;

            next(); // Proceed to next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = { auth };
