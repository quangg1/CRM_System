const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.password;
        this.company = userData.company;
        this.role = userData.role || 'sales';
        this.avatar = userData.avatar;
        this.created_at = userData.created_at;
        this.updated_at = userData.updated_at;
    }

    // Create a new user
    static async create(userData) {
        try {
            const { name, email, password, company, role = 'sales' } = userData;
            
            // Generate unique ID
            const userId = require('crypto').randomUUID();
            
            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const [result] = await pool.execute(
                'INSERT INTO users (id, name, email, password, company, role) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, name, email, hashedPassword, company, role]
            );

            if (result.affectedRows === 1) {
                return await User.findById(userId);
            }
            throw new Error('Failed to create user');
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );

            if (rows.length === 0) {
                return null;
            }

            return new User(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                return null;
            }

            return new User(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    // Get all users
    static async findAll() {
        try {
            const [rows] = await pool.execute(
                'SELECT id, name, email, company, role, avatar, created_at, updated_at FROM users ORDER BY created_at DESC'
            );

            return rows.map(row => new User(row));
        } catch (error) {
            throw error;
        }
    }

    // Update user
    async update(updateData) {
        try {
            const allowedFields = ['name', 'email', 'company', 'role', 'avatar'];
            const updates = [];
            const values = [];

            // Build dynamic update query
            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key) && updateData[key] !== undefined) {
                    updates.push(`${key} = ?`);
                    values.push(updateData[key]);
                }
            });

            if (updates.length === 0) {
                throw new Error('No valid fields to update');
            }

            values.push(this.id);

            const [result] = await pool.execute(
                `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                values
            );

            if (result.affectedRows === 1) {
                return await User.findById(this.id);
            }
            throw new Error('Failed to update user');
        } catch (error) {
            throw error;
        }
    }

    // Change password
    async changePassword(newPassword) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const [result] = await pool.execute(
                'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [hashedPassword, this.id]
            );

            return result.affectedRows === 1;
        } catch (error) {
            throw error;
        }
    }

    // Verify password
    async verifyPassword(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    }

    // Delete user
    async delete() {
        try {
            const [result] = await pool.execute(
                'DELETE FROM users WHERE id = ?',
                [this.id]
            );

            return result.affectedRows === 1;
        } catch (error) {
            throw error;
        }
    }

    // Check if email exists
    static async emailExists(email, excludeId = null) {
        try {
            let query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
            let params = [email];

            if (excludeId) {
                query += ' AND id != ?';
                params.push(excludeId);
            }

            const [rows] = await pool.execute(query, params);
            return rows[0].count > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get user profile (without password)
    getProfile() {
        const { password, ...profile } = this;
        return profile;
    }

    // Convert to JSON (excluding password)
    toJSON() {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}

module.exports = User;
