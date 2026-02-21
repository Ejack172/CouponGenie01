const express = require('express');
const { addComment, getCommentsByDeal } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:dealId', getCommentsByDeal);
router.post('/', authMiddleware, addComment);

module.exports = router;
