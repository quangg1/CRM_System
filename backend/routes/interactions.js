const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/interactionController');

// Get all interactions
router.get('/', getAllInteractions);

// Get interaction statistics
router.get('/stats', getInteractionStats);

// Get upcoming interactions
router.get('/upcoming', getUpcomingInteractions);

// Get interactions by type
router.get('/type/:type', getInteractionsByType);

// Get interactions by status
router.get('/status/:status', getInteractionsByStatus);

// Get interactions by customer ID
router.get('/customer/:customerId', getInteractionsByCustomerId);

// Get interaction by ID
router.get('/:id', getInteractionById);

// Create new interaction
router.post('/', createInteraction);

// Update interaction
router.put('/:id', updateInteraction);

// Delete interaction
router.delete('/:id', deleteInteraction);

module.exports = router; 