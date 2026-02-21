const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!email && !phone) return res.status(400).json({ error: 'Email or Phone is required' });
        if (!password) return res.status(400).json({ error: 'Password is required' });

        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined },
                    { phone: phone || undefined },
                    { username: username || undefined }
                ]
            }
        });

        if (existing) return res.status(400).json({ error: 'User already exists' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, phone, passwordHash }
        });

        const token = generateToken(user);
        res.status(201).json({ message: 'Registered successfully', token, user: { id: user.id, username, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if (!password || (!email && !phone)) {
            return res.status(400).json({ error: 'Credentials required' });
        }

        const user = await prisma.user.findFirst({
            where: email ? { email } : { phone }
        });

        if (!user || user.googleId) return res.status(401).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Stubs for future implementation
const oauthGoogle = async (req, res) => { res.status(501).json({ message: 'OAuth not implemented yet' }); };
const requestOtp = async (req, res) => { res.status(501).json({ message: 'OTP flow not implemented yet' }); };
const verifyOtp = async (req, res) => { res.status(501).json({ message: 'OTP flow not implemented yet' }); };

module.exports = { register, login, oauthGoogle, requestOtp, verifyOtp };
