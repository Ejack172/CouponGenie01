const express = require('express');
const { getWishlist, toggleWishlist, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/wishlist', getWishlist);
router.post('/wishlist/toggle', toggleWishlist);
router.get('/profile', getProfile);

module.exports = router;
