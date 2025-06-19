const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Create activity
router.post('/', async (req, res, next) => {
    try {
        const data = await Activity.create(req.body);
        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
});
// Update activity
router.put('/:id', async (req, res, next) => {
    try {
        const data = await Activity.update(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
});
// Delete activity
router.delete('/:id', async (req, res, next) => {
    try {
        const ok = await Activity.delete(req.params.id);
        if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
});
// Get all activities
router.get('/', async (req, res, next) => {
    try {
        const data = await Activity.getAll();
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
});
// Get activity by id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await Activity.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
});

module.exports = router; 