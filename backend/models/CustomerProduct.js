const { pool } = require('../config/database');
const { randomUUID } = require('crypto');

class CustomerProduct {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM customer_products ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM customer_products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const id = randomUUID();
        const { customer_id, product_id, status } = data;
        await pool.execute(
            'INSERT INTO customer_products (id, customer_id, product_id, status) VALUES (?, ?, ?, ?)',
            [id, customer_id, product_id, status]
        );
        return { id, ...data };
    }

    static async update(id, data) {
        const { customer_id, product_id, status } = data;
        await pool.execute(
            'UPDATE customer_products SET customer_id = ?, product_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [customer_id, product_id, status, id]
        );
        return { id, ...data };
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM customer_products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getByCustomerId(customerId) {
        const [rows] = await pool.execute(
            `SELECT cp.*, p.name as product_name, p.status as product_status
             FROM customer_products cp
             JOIN products p ON cp.product_id = p.id
             WHERE cp.customer_id = ?
             ORDER BY cp.created_at DESC`,
            [customerId]
        );
        return rows;
    }
}

module.exports = CustomerProduct; 