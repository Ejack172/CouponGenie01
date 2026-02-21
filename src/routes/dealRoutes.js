const express = require('express');
const {
    getDeals,
    getLootDeals,
    clickDeal,
    createDeal,
    updateDeal,
    deleteDeal
} = require('../controllers/dealController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getDeals);
router.get('/loot', getLootDeals);
router.patch('/:id/click', clickDeal);

// Protected Admin Routes
router.post('/', authMiddleware, createDeal);
router.put('/:id', authMiddleware, updateDeal);
router.delete('/:id', authMiddleware, deleteDeal);

module.exports = router;
