const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const dealId = parseInt(req.body.dealId);
        const content = req.body.content;

        if (!dealId || !content) {
            return res.status(400).json({ error: 'dealId and content are required' });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                dealId
            },
            include: {
                user: { select: { username: true, avatarURL: true } }
            }
        });

        res.status(201).json({ message: 'Comment added', data: comment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

const getCommentsByDeal = async (req, res) => {
    try {
        const dealId = parseInt(req.params.dealId);
        const comments = await prisma.comment.findMany({
            where: { dealId, isFlagged: false },
            include: {
                user: { select: { username: true, avatarURL: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ data: comments });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

module.exports = {
    addComment,
    getCommentsByDeal
};
