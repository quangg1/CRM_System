const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res, next) => {
    try {
        const data = await Product.getAll();
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
});

// Get product by id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await Product.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
});

module.exports = router; 