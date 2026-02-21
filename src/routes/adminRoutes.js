const express = require('express');
const multer = require('multer');
const path = require('path');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const {
    getDashboardStats,
    getAdminDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    getAdminBlogs,
    createBlog
} = require('../controllers/adminController');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/uploads/')),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only images are allowed'));
    }
});

// Apply auth and admin checks globally to this router
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Deals (override specific admin actions)
router.get('/deals', getAdminDeals);
router.post('/deals', createDeal);
router.put('/deals/:id', updateDeal);
router.delete('/deals/:id', deleteDeal);

// Blogs
router.get('/blogs', getAdminBlogs);
router.post('/blogs', upload.single('image'), createBlog);

module.exports = router;
