const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const customerRoutes = require('./routes/customers');
const interactionRoutes = require('./routes/interactions');
const authRoutes = require('./routes/auth');
const customerProductRoutes = require('./routes/customerProducts');
const productRoutes = require('./routes/products');
const activityRoutes = require('./routes/activities');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/customerProducts', customerProductRoutes);
app.use('/api/products', productRoutes);
app.use('/api/activities', activityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'CRM API is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to CRM System API',
        version: '1.0.0',        endpoints: {
            auth: '/api/auth',
            customers: '/api/customers',
            interactions: '/api/interactions',
            health: '/api/health'
        }
    });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 