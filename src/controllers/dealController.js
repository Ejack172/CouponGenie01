const { PrismaClient } = require('@prisma/client');
const redisClient = require('../utils/redisClient');
const prisma = new PrismaClient();

// Helper to invalidate all deals cache keys
const invalidateDealsCache = async () => {
    if (redisClient.isReady) {
        try {
            const keys = await redisClient.keys('deals:*');
            if (keys.length > 0) {
                await redisClient.del(keys);
            }
        } catch (err) {
            console.warn('Cache invalidation failed:', err.message);
        }
    }
};

const getDeals = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { categoryId, storeId, sort } = req.query;

        // Build query filters
        const where = { status: 'APPROVED' };
        if (categoryId) where.categoryId = parseInt(categoryId);
        if (storeId) where.storeId = parseInt(storeId);

        // Build sort options
        let orderBy = {};
        if (sort === 'discountPercentage') {
            orderBy = { discountPercentage: 'desc' };
        } else if (sort === 'popularity') {
            orderBy = { viewsCount: 'desc' };
        } else {
            orderBy = { createdAt: 'desc' };
        }

        // Cache key based on query parameters
        const cacheKey = `deals:page${page}:limit${limit}:cat${categoryId || 'all'}:store${storeId || 'all'}:sort${sort || 'createdAt'}`;

        if (redisClient.isReady) {
            const cached = await redisClient.get(cacheKey);
            if (cached) {
                return res.json({ source: 'cache', data: JSON.parse(cached) });
            }
        }

        const [deals, totalCount] = await Promise.all([
            prisma.deal.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    store: true,
                    category: true,
                    tags: true,
                    _count: {
                        select: { comments: true, wishlistedBy: true }
                    }
                }
            }),
            prisma.deal.count({ where })
        ]);

        const result = {
            source: 'database',
            data: deals,
            pagination: {
                total: totalCount,
                page,
                totalPages: Math.ceil(totalCount / limit)
            }
        };

        // Cache results for 5 minutes
        if (redisClient.isReady) {
            await redisClient.setEx(cacheKey, 300, JSON.stringify(result));
        }

        res.json(result);
    } catch (error) {
        console.error('Failed to fetch deals:', error);
        res.status(500).json({ error: 'Server error fetching deals' });
    }
};

const getLootDeals = async (req, res) => {
    try {
        const deals = await prisma.deal.findMany({
            where: { isLootDeal: true },
            orderBy: { createdAt: 'desc' },
            include: { store: true, category: true }
        });
        res.json({ data: deals });
    } catch (error) {
        console.error('Failed to fetch loot deals:', error);
        res.status(500).json({ error: 'Server error fetching loot deals' });
    }
};

const clickDeal = async (req, res) => {
    try {
        const dealId = parseInt(req.params.id);

        const updatedDeal = await prisma.deal.update({
            where: { id: dealId },
            data: { clickCount: { increment: 1 } }
        });

        res.json({ message: 'Click recorded', data: updatedDeal });
    } catch (error) {
        console.error('Click deal error:', error);
        res.status(500).json({ error: 'Failed to record click' });
    }
};

const createDeal = async (req, res) => {
    try {
        const newDeal = await prisma.deal.create({
            data: req.body
        });

        await invalidateDealsCache();
        res.status(201).json({ message: 'Deal created successfully', data: newDeal });
    } catch (error) {
        console.error('Create deal error:', error);
        res.status(400).json({ error: 'Failed to create deal' });
    }
};

const updateDeal = async (req, res) => {
    try {
        const dealId = parseInt(req.params.id);
        const updatedDeal = await prisma.deal.update({
            where: { id: dealId },
            data: req.body
        });

        await invalidateDealsCache();
        res.json({ message: 'Deal updated successfully', data: updatedDeal });
    } catch (error) {
        console.error('Update deal error:', error);
        res.status(400).json({ error: 'Failed to update deal' });
    }
};

const deleteDeal = async (req, res) => {
    try {
        const dealId = parseInt(req.params.id);
        await prisma.deal.delete({
            where: { id: dealId }
        });

        await invalidateDealsCache();
        res.json({ message: 'Deal deleted successfully' });
    } catch (error) {
        console.error('Delete deal error:', error);
        res.status(400).json({ error: 'Failed to delete deal' });
    }
};

module.exports = {
    getDeals,
    getLootDeals,
    clickDeal,
    createDeal,
    updateDeal,
    deleteDeal
};
