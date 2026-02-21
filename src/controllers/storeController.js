const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStores = async (req, res) => {
    try {
        const stores = await prisma.store.findMany({
            orderBy: { name: 'asc' }
        });
        res.json({ data: stores });
    } catch (error) {
        console.error('Failed to fetch stores:', error);
        res.status(500).json({ error: 'Server error fetching stores' });
    }
};

module.exports = { getStores };
