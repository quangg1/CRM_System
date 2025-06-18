const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'anhday0810',
    database: process.env.DB_NAME || 'crm_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // SSL configuration for Railway
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully!');
        console.log(` Database: ${process.env.DB_NAME || 'crm_system'}`);
        console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
        connection.release();
    } catch (error) {
        console.error(' Database connection failed:', error.message);
        if (process.env.NODE_ENV === 'production') {
            console.error(' Exiting due to database connection failure in production');
            process.exit(1);
        } else {
            console.warn(' Database connection failed in development mode, continuing...');
        }
    }
};

module.exports = {
    pool,
    testConnection
};
