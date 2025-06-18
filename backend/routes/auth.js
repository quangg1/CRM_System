const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Semi-protected routes (optional auth)
router.post('/logout', optionalAuth, AuthController.logout);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, AuthController.updateProfile);
router.put('/change-password', authenticateToken, AuthController.changePassword);

module.exports = router;
