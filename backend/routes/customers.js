const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    getCustomersByStatus,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    searchCustomersByName,
    getCustomerStats
} = require('../controllers/customerController');

// Get all customers
router.get('/', getAllCustomers);

// Get customer statistics
router.get('/stats', getCustomerStats);

// Search customers
router.get('/search', searchCustomers);

// Search customers by name only
router.get('/search/name', searchCustomersByName);

// Get customers by status
router.get('/status/:status', getCustomersByStatus);

// Get customer by ID
router.get('/:id', getCustomerById);

// Create new customer
router.post('/', createCustomer);

// Update customer
router.put('/:id', updateCustomer);

// Delete customer
router.delete('/:id', deleteCustomer);

module.exports = router; 