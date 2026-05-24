const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getAllShows, getShowById, getFavorites, toggleFavorite } = require('../controllers/showController');

router.get('/', authenticate, getAllShows);
router.get('/favorites', authenticate, getFavorites);
router.get('/:id', authenticate, getShowById);
router.patch('/:id/favorite', authenticate, toggleFavorite);

module.exports = router;