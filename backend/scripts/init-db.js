const mysql = require('mysql2/promise');
require('dotenv').config();

const initDatabase = async () => {
    let connection;

    try {
        // Connect to MySQL server (without specifying database)
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'anhday0810',
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : false
        });

        console.log('✅ Connected to MySQL server');

        // Create database if it doesn't exist
        const dbName = process.env.DB_NAME || 'crm_system';
        await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created or already exists`);

        // Use the database
        await connection.execute(`USE \`${dbName}\``);

        // Create tables
        const createTables = [
            // Users table
            `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // Customers table
            `CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100),
                phone VARCHAR(20),
                company VARCHAR(100),
                status ENUM('active', 'inactive', 'prospect') DEFAULT 'prospect',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // Interactions table
            `CREATE TABLE IF NOT EXISTS interactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT NOT NULL,
                user_id INT NOT NULL,
                type ENUM('call', 'email', 'meeting', 'note') NOT NULL,
                description TEXT,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`,

            // Add indexes for better performance
            `CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status)`,
            `CREATE INDEX IF NOT EXISTS idx_interactions_customer_id ON interactions(customer_id)`,
            `CREATE INDEX IF NOT EXISTS idx_interactions_date ON interactions(date)`
        ];

        for (const query of createTables) {
            await connection.execute(query);
        }

        console.log('✅ All tables created successfully');

        // Insert default admin user if not exists
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await connection.execute(`
            INSERT IGNORE INTO users (username, email, password, role) 
            VALUES ('admin', 'admin@crm.com', ?, 'admin')
        `, [hashedPassword]);

        console.log('✅ Default admin user created (username: admin, password: admin123)');

        console.log('🎉 Database initialization completed successfully!');

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Run if this file is executed directly
if (require.main === module) {
    initDatabase()
        .then(() => {
            console.log('✅ Database setup completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = { initDatabase }; 