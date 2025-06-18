const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    // Register new user
    static async register(req, res) {
        try {
            const { name, email, password, company } = req.body;

            // Validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required'
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Check password length
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters long'
                });
            }

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists with this email'
                });
            }

            // Create new user
            const userData = {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
                company: company ? company.trim() : null,
                role: 'sales'
            };

            const newUser = await User.create(userData);

            // Generate JWT token
            const token = AuthController.generateToken(newUser);

            // Log registration
            console.log(`✅ User registered successfully: ${newUser.email}`);

            res.status(201).json({
                success: true,
                data: {
                    user: newUser.toJSON(),
                    token
                },
                message: 'User registered successfully'
            });

        } catch (error) {
            console.error('❌ Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error during registration'
            });
        }
    }

    // Login user
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find user by email
            const user = await User.findByEmail(email.toLowerCase().trim());
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Verify password
            const isPasswordValid = await user.verifyPassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Generate JWT token
            const token = AuthController.generateToken(user);

            // Log successful login
            console.log(`✅ User logged in successfully: ${user.email}`);

            res.json({
                success: true,
                data: {
                    user: user.toJSON(),
                    token
                },
                message: 'Login successful'
            });

        } catch (error) {
            console.error('❌ Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error during login'
            });
        }
    }

    // Logout user
    static async logout(req, res) {
        try {
            // In a stateless JWT system, logout is handled client-side
            // by removing the token from storage
            // Here we can log the logout action if needed
            
            const user = req.user;
            if (user) {
                console.log(`👋 User logged out: ${user.email}`);
            }

            res.json({
                success: true,
                message: 'Logged out successfully'
            });

        } catch (error) {
            console.error('❌ Logout error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error during logout'
            });
        }
    }

    // Get current user profile
    static async getProfile(req, res) {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            // Get fresh user data from database
            const currentUser = await User.findById(user.id);
            if (!currentUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                data: {
                    user: currentUser.toJSON()
                },
                message: 'Profile retrieved successfully'
            });

        } catch (error) {
            console.error('❌ Get profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update user profile
    static async updateProfile(req, res) {
        try {
            const user = req.user;
            const { name, email, company } = req.body;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            // Validate input
            const updateData = {};
            if (name) updateData.name = name.trim();
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email format'
                    });
                }
                
                // Check if email is already taken by another user
                const emailExists = await User.emailExists(email.toLowerCase().trim(), user.id);
                if (emailExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email is already taken'
                    });
                }
                updateData.email = email.toLowerCase().trim();
            }
            if (company !== undefined) updateData.company = company ? company.trim() : null;

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No valid fields to update'
                });
            }

            // Update user
            const currentUser = await User.findById(user.id);
            const updatedUser = await currentUser.update(updateData);

            console.log(`📝 User profile updated: ${updatedUser.email}`);

            res.json({
                success: true,
                data: {
                    user: updatedUser.toJSON()
                },
                message: 'Profile updated successfully'
            });

        } catch (error) {
            console.error('❌ Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Change password
    static async changePassword(req, res) {
        try {
            const user = req.user;
            const { currentPassword, newPassword } = req.body;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            // Validation
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required'
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'New password must be at least 6 characters long'
                });
            }

            // Get current user and verify current password
            const currentUser = await User.findById(user.id);
            const isCurrentPasswordValid = await currentUser.verifyPassword(currentPassword);
            
            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }

            // Update password
            await currentUser.changePassword(newPassword);

            console.log(`🔒 Password changed for user: ${currentUser.email}`);

            res.json({
                success: true,
                message: 'Password changed successfully'
            });

        } catch (error) {
            console.error('❌ Change password error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Generate JWT token
    static generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role
        };

        return jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
    }

    // Verify JWT token
    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = AuthController;
