const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ data: categories });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
};

module.exports = { getCategories };
