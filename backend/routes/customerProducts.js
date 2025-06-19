const express = require('express');
const router = express.Router();
const customerProductController = require('../controllers/customerProductController');

router.get('/', customerProductController.getAll);
router.get('/:id', customerProductController.getById);
router.post('/', customerProductController.create);
router.put('/:id', customerProductController.update);
router.delete('/:id', customerProductController.delete);

module.exports = router; 