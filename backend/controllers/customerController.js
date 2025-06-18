const Customer = require('../models/Customer');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.getAll();
        res.json({
            success: true,
            data: customers,
            message: 'Customers retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.getById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer,
            message: 'Customer retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get customers by status
const getCustomersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const customers = await Customer.getByStatus(status);

        res.json({
            success: true,
            data: customers,
            message: `Customers with status '${status}' retrieved successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new customer
const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, status, notes } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        const customerData = { name, email, phone, company, status, notes };
        const newCustomer = await Customer.create(customerData);

        res.status(201).json({
            success: true,
            data: newCustomer,
            message: 'Customer created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company, status, notes } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        const customerData = { name, email, phone, company, status, notes };
        const updatedCustomer = await Customer.update(id, customerData);

        res.json({
            success: true,
            data: updatedCustomer,
            message: 'Customer updated successfully'
        });
    } catch (error) {
        if (error.message === 'Customer not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await Customer.delete(id);

        res.json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        if (error.message === 'Customer not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search customers
const searchCustomers = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const customers = await Customer.search(q);

        res.json({
            success: true,
            data: customers,
            message: `Search results for '${q}'`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search customers by name only
const searchCustomersByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name parameter is required'
            });
        }

        const customers = await Customer.searchByName(name);

        res.json({
            success: true,
            data: customers,
            message: `Search results for name '${name}'`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get customer statistics
const getCustomerStats = async (req, res) => {
    try {
        const stats = await Customer.getStats();

        res.json({
            success: true,
            data: stats,
            message: 'Customer statistics retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomersByStatus,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    searchCustomersByName,
    getCustomerStats
}; 