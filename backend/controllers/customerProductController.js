const CustomerProduct = require('../models/CustomerProduct');

const customerProductController = {
    async getAll(req, res, next) {
        try {
            const data = await CustomerProduct.getAll();
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    },

    async getById(req, res, next) {
        try {
            const data = await CustomerProduct.getById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const data = await CustomerProduct.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const data = await CustomerProduct.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const ok = await CustomerProduct.delete(req.params.id);
            if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = customerProductController; 