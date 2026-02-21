const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await prisma.wishlist.findMany({
            where: { userId },
            include: {
                deal: {
                    include: { store: true, category: true }
                }
            }
        });
        res.json({ data: wishlist.map(w => w.deal) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
};

const toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const dealId = parseInt(req.body.dealId);

        if (!dealId) return res.status(400).json({ error: 'dealId required' });

        const existing = await prisma.wishlist.findUnique({
            where: { userId_dealId: { userId, dealId } }
        });

        if (existing) {
            await prisma.wishlist.delete({ where: { userId_dealId: { userId, dealId } } });
            return res.json({ message: 'Removed from wishlist' });
        } else {
            await prisma.wishlist.create({ data: { userId, dealId } });
            return res.json({ message: 'Added to wishlist' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle wishlist' });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, username: true, email: true, phone: true, role: true, avatarURL: true, createdAt: true }
        });
        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load profile' });
    }
};

module.exports = {
    getWishlist,
    toggleWishlist,
    getProfile
};
