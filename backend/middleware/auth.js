const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Get user from database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error('❌ Authentication error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication'
        });
    }
};

// Middleware to check user role
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            next();
        } catch (error) {
            console.error('❌ Authorization error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during authorization'
            });
        }
    };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
                const user = await User.findById(decoded.userId);
                if (user) {
                    req.user = user;
                }
            } catch (error) {
                // Ignore token errors for optional auth
                console.log('Optional auth failed:', error.message);
            }
        }

        next();
    } catch (error) {
        console.error('❌ Optional auth error:', error);
        next(); // Continue even if there's an error
    }
};

module.exports = {
    authenticateToken,
    authorizeRole,
    optionalAuth
};
