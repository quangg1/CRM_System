const { pool } = require('../config/database');
const { v4: uuidv4 } = require('crypto');

class Interaction {
    // Get all interactions
    static async getAll() {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        ORDER BY i.date DESC
      `);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching interactions: ${error.message}`);
        }
    }

    // Get interaction by ID
    static async getById(id) {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        WHERE i.id = ?
      `, [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching interaction: ${error.message}`);
        }
    }

    // Get interactions by customer ID
    static async getByCustomerId(customerId) {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        WHERE i.customer_id = ? 
        ORDER BY i.date DESC
      `, [customerId]);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching customer interactions: ${error.message}`);
        }
    }

    // Get interactions by type
    static async getByType(type) {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        WHERE i.type = ? 
        ORDER BY i.date DESC
      `, [type]);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching interactions by type: ${error.message}`);
        }
    }

    // Get interactions by status
    static async getByStatus(status) {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        WHERE i.status = ? 
        ORDER BY i.date DESC
      `, [status]);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching interactions by status: ${error.message}`);
        }
    }

    // Create new interaction
    static async create(interactionData) {
        try {
            const id = uuidv4();
            const { customer_id, type, description, date, status } = interactionData;

            const [result] = await pool.execute(
                'INSERT INTO interactions (id, customer_id, type, description, date, status) VALUES (?, ?, ?, ?, ?, ?)',
                [id, customer_id, type, description, date, status || 'scheduled']
            );

            return { id, ...interactionData };
        } catch (error) {
            throw new Error(`Error creating interaction: ${error.message}`);
        }
    }

    // Update interaction
    static async update(id, interactionData) {
        try {
            const { customer_id, type, description, date, status } = interactionData;

            const [result] = await pool.execute(
                'UPDATE interactions SET customer_id = ?, type = ?, description = ?, date = ?, status = ? WHERE id = ?',
                [customer_id, type, description, date, status, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Interaction not found');
            }

            return { id, ...interactionData };
        } catch (error) {
            throw new Error(`Error updating interaction: ${error.message}`);
        }
    }

    // Delete interaction
    static async delete(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM interactions WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Interaction not found');
            }

            return true;
        } catch (error) {
            throw new Error(`Error deleting interaction: ${error.message}`);
        }
    }

    // Get upcoming interactions
    static async getUpcoming() {
        try {
            const [rows] = await pool.execute(`
        SELECT i.*, c.name as customer_name, c.email as customer_email 
        FROM interactions i 
        JOIN customers c ON i.customer_id = c.id 
        WHERE i.date >= NOW() AND i.status = 'scheduled'
        ORDER BY i.date ASC
      `);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching upcoming interactions: ${error.message}`);
        }
    }

    // Get interaction statistics
    static async getStats() {
        try {
            const [rows] = await pool.execute(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
          SUM(CASE WHEN type = 'call' THEN 1 ELSE 0 END) as calls,
          SUM(CASE WHEN type = 'email' THEN 1 ELSE 0 END) as emails,
          SUM(CASE WHEN type = 'meeting' THEN 1 ELSE 0 END) as meetings,
          SUM(CASE WHEN type = 'note' THEN 1 ELSE 0 END) as notes
        FROM interactions
      `);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching interaction stats: ${error.message}`);
        }
    }
}

module.exports = Interaction; 