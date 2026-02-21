const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: false
    }
});

redisClient.on('error', (err) => console.warn('Redis Client Error (Caching disabled):', err.message));
redisClient.on('connect', () => console.log('Redis connected successfully'));

// Connect asynchronously to avoid blocking app startup if Redis is down
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.warn('Failed to connect to Redis initially. Please ensure Redis server is running.', err.message);
    }
})();

module.exports = redisClient;
