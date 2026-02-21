const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes');
const storeRoutes = require('./routes/storeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ADDED

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes); // ADDED

// Health check endpoint and serving frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.json({ message: 'Welcome to CouponGenie.in API' });
});

module.exports = app;
