const { pool } = require('../config/database');
const { randomUUID } = require('crypto');

class Activity {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM activities ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const id = randomUUID();
        const { interaction_id, type, title, description } = data;
        await pool.execute(
            'INSERT INTO activities (id, interaction_id, type, title, description) VALUES (?, ?, ?, ?, ?)',
            [id, interaction_id, type, title, description]
        );
        return { id, ...data };
    }

    static async update(id, data) {
        const { interaction_id, type, title, description } = data;
        await pool.execute(
            'UPDATE activities SET interaction_id = ?, type = ?, title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [interaction_id, type, title, description, id]
        );
        return { id, ...data };
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM activities WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Activity; 