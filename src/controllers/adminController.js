const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
    try {
        const dealsCount = await prisma.deal.count();
        const activeUsers = await prisma.user.count();
        const pendingDeals = await prisma.deal.count({ where: { status: 'PENDING' } });
        const blogsCount = await prisma.blog.count();
        const storesCount = await prisma.store.count();

        const topDeals = await prisma.deal.findMany({
            take: 5,
            orderBy: { viewsCount: 'desc' },
            include: { store: true }
        });

        res.json({
            data: {
                dealsCount,
                activeUsers,
                pendingDeals,
                blogsCount,
                storesCount,
                topDeals
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};

// Deals Management
const getAdminDeals = async (req, res) => {
    try {
        const deals = await prisma.deal.findMany({
            include: { store: true, category: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ data: deals });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch deals' });
    }
};

const createDeal = async (req, res) => {
    try {
        // Basic implementation since forms would require proper payload handling including tags array
        const data = req.body;
        data.status = 'APPROVED';
        data.storeId = parseInt(data.storeId);
        data.categoryId = parseInt(data.categoryId);
        data.originalPrice = parseFloat(data.originalPrice);
        data.discountedPrice = parseFloat(data.discountedPrice);
        data.discountPercentage = parseFloat(data.discountPercentage);

        // connect tags if provided
        if (data.tags && Array.isArray(data.tags)) {
            const tagConnect = data.tags.map(id => ({ id: parseInt(id) }));
            data.tags = { connect: tagConnect };
        } else {
            delete data.tags;
        }

        const newDeal = await prisma.deal.create({ data });
        res.status(201).json({ data: newDeal });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create deal' });
    }
};

const updateDeal = async (req, res) => {
    try {
        const dealId = parseInt(req.params.id);
        const updated = await prisma.deal.update({
            where: { id: dealId },
            data: req.body
        });
        res.json({ data: updated });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update deal' });
    }
};

const deleteDeal = async (req, res) => {
    try {
        await prisma.deal.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Deal deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete' });
    }
};

// Simple Blogs endpoints matching the schema
const getAdminBlogs = async (req, res) => {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ data: blogs });
}
const createBlog = async (req, res) => {
    try {
        const data = { ...req.body, authorId: req.user.id };
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        const blog = await prisma.blog.create({ data });
        res.json({ data: blog });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed' });
    }
}

// Ensure the uploaded images are served:
module.exports = {
    getDashboardStats,
    getAdminDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    getAdminBlogs,
    createBlog
};
