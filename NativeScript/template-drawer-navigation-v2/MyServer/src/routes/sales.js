const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createSale, getSalesHistory, getSalesAnalytics } = require('../controllers/saleController');

router.post('/', authenticate, createSale);
router.get('/history', authenticate, getSalesHistory);
router.get('/analytics', authenticate, getSalesAnalytics);

module.exports = router;