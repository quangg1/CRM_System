const { pool } = require('../config/database');
const { randomUUID } = require('crypto');

class Product {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const id = randomUUID();
        const { name, description, price, category, status } = data;
        await pool.execute(
            'INSERT INTO products (id, name, description, price, category, status) VALUES (?, ?, ?, ?, ?, ?)',
            [id, name, description, price, category, status]
        );
        return { id, ...data };
    }

    static async update(id, data) {
        const { name, description, price, category, status } = data;
        await pool.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, description, price, category, status, id]
        );
        return { id, ...data };
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Product; 