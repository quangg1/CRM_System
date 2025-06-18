const { pool } = require('../config/database');
const { randomUUID } = require('crypto');

class Customer {
    // Get all customers
    static async getAll() {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM customers ORDER BY created_at DESC'
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }

    // Get customer by ID
    static async getById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM customers WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching customer: ${error.message}`);
        }
    }

    // Get customers by status
    static async getByStatus(status) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM customers WHERE status = ? ORDER BY created_at DESC',
                [status]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching customers by status: ${error.message}`);
        }
    }

    // Create new customer
    static async create(customerData) {
        try {
            const id = randomUUID();
            const { name, email, phone, company, status, notes } = customerData;

            const [result] = await pool.execute(
                'INSERT INTO customers (id, name, email, phone, company, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id, name, email, phone, company, status || 'lead', notes]
            );

            return { id, ...customerData };
        } catch (error) {
            throw new Error(`Error creating customer: ${error.message}`);
        }
    }

    // Update customer
    static async update(id, customerData) {
        try {
            const { name, email, phone, company, status, notes } = customerData;

            const [result] = await pool.execute(
                'UPDATE customers SET name = ?, email = ?, phone = ?, company = ?, status = ?, notes = ? WHERE id = ?',
                [name, email, phone, company, status, notes, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }

            return { id, ...customerData };
        } catch (error) {
            throw new Error(`Error updating customer: ${error.message}`);
        }
    }

    // Delete customer
    static async delete(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM customers WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }

            return true;
        } catch (error) {
            throw new Error(`Error deleting customer: ${error.message}`);
        }
    }

    // Search customers
    static async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const [rows] = await pool.execute(
                'SELECT * FROM customers WHERE name LIKE ? OR email LIKE ? OR company LIKE ? ORDER BY created_at DESC',
                [searchQuery, searchQuery, searchQuery]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error searching customers: ${error.message}`);
        }
    }

    // Search customers by name only
    static async searchByName(name) {
        try {
            const searchQuery = `%${name}%`;
            const [rows] = await pool.execute(
                'SELECT * FROM customers WHERE name LIKE ? ORDER BY created_at DESC',
                [searchQuery]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error searching customers by name: ${error.message}`);
        }
    }

    // Get customer statistics
    static async getStats() {
        try {
            const [rows] = await pool.execute(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'lead' THEN 1 ELSE 0 END) as leads,
          SUM(CASE WHEN status = 'customer' THEN 1 ELSE 0 END) as customers,
          SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive
        FROM customers
      `);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching customer stats: ${error.message}`);
        }
    }
}

module.exports = Customer; 