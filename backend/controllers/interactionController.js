const Interaction = require('../models/Interaction');

// Get all interactions
const getAllInteractions = async (req, res) => {
    try {
        const interactions = await Interaction.getAll();
        res.json({
            success: true,
            data: interactions,
            message: 'Interactions retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get interaction by ID
const getInteractionById = async (req, res) => {
    try {
        const { id } = req.params;
        const interaction = await Interaction.getById(id);

        if (!interaction) {
            return res.status(404).json({
                success: false,
                message: 'Interaction not found'
            });
        }

        res.json({
            success: true,
            data: interaction,
            message: 'Interaction retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get interactions by customer ID
const getInteractionsByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const interactions = await Interaction.getByCustomerId(customerId);

        res.json({
            success: true,
            data: interactions,
            message: 'Customer interactions retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get interactions by type
const getInteractionsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const interactions = await Interaction.getByType(type);

        res.json({
            success: true,
            data: interactions,
            message: `Interactions of type '${type}' retrieved successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get interactions by status
const getInteractionsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const interactions = await Interaction.getByStatus(status);

        res.json({
            success: true,
            data: interactions,
            message: `Interactions with status '${status}' retrieved successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new interaction
const createInteraction = async (req, res) => {
    try {
        const { customer_id, type, description, date, status } = req.body;

        // Validation
        if (!customer_id || !type || !description || !date) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID, type, description, and date are required'
            });
        }

        const interactionData = { customer_id, type, description, date, status };
        const newInteraction = await Interaction.create(interactionData);

        res.status(201).json({
            success: true,
            data: newInteraction,
            message: 'Interaction created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update interaction
const updateInteraction = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, type, description, date, status } = req.body;

        // Validation
        if (!customer_id || !type || !description || !date) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID, type, description, and date are required'
            });
        }

        const interactionData = { customer_id, type, description, date, status };
        const updatedInteraction = await Interaction.update(id, interactionData);

        res.json({
            success: true,
            data: updatedInteraction,
            message: 'Interaction updated successfully'
        });
    } catch (error) {
        if (error.message === 'Interaction not found') {
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

// Delete interaction
const deleteInteraction = async (req, res) => {
    try {
        const { id } = req.params;
        await Interaction.delete(id);

        res.json({
            success: true,
            message: 'Interaction deleted successfully'
        });
    } catch (error) {
        if (error.message === 'Interaction not found') {
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

// Get upcoming interactions
const getUpcomingInteractions = async (req, res) => {
    try {
        const interactions = await Interaction.getUpcoming();

        res.json({
            success: true,
            data: interactions,
            message: 'Upcoming interactions retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get interaction statistics
const getInteractionStats = async (req, res) => {
    try {
        const stats = await Interaction.getStats();

        res.json({
            success: true,
            data: stats,
            message: 'Interaction statistics retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllInteractions,
    getInteractionById,
    getInteractionsByCustomerId,
    getInteractionsByType,
    getInteractionsByStatus,
    createInteraction,
    updateInteraction,
    deleteInteraction,
    getUpcomingInteractions,
    getInteractionStats
}; 